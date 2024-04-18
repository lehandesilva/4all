"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { auth } from "@/auth";
import { fetchUserByEmail } from "./data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const courseFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Course name must not be empty"),
  instructor_id: z.string(),
  instructor_name: z.string(),
  categoryId: z.string({ invalid_type_error: "Select a category." }),
  description: z
    .string()
    .min(10, { message: "Description must be longer than 10 characters." }),
  rating: z.number().gt(0).lt(5),
  reviews: z.array(z.unknown()), // Placeholder for future review schema
  sections: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Section name must not be empty"),
      course_material_id: z.string(),
    })
  ),
  img_url: z.string(),
});

const CreateCourse = courseFormSchema.omit({
  id: true,
  instructor_id: true,
  instructor_name: true,
  rating: true,
  reviews: true,
  sections: true,
  img_url: true,
});

export type State = {
  errors?: {
    name?: string[];
    categoryId?: string[];
    description?: string[];
  };
  message?: string | null;
};

interface Section {
  id: number;
  name: string;
  content?: { id: number; type: string; content: string; size: string }[]; // Array of block objects
}

export async function createCourse(prevState: State, formData: FormData) {
  const validatedFields = CreateCourse.safeParse({
    name: formData.get("name"),
    categoryId: formData.get("categoryId"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create course.",
    };
  }

  const image_url = formData.get("image_url");
  const { name, categoryId, description } = validatedFields.data;
  const session = await auth();
  const userDetails = await fetchUserByEmail(session?.user?.email as string);
  let courseId;
  console.log(image_url);
  try {
    const result = await sql`
      INSERT INTO courses (name, instructor_id, instructor_name, category_id, description, rating, img_url)
      VALUES (${name}, ${userDetails?.id}, ${userDetails?.name}, ${categoryId}, ${description}, 0, ${image_url})
      RETURNING id;
    `;

    courseId = result.rows[0].id;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }
  revalidatePath("/course");
  redirect(`/profile/create/${courseId}`);
}

const sectionFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Section name required" }),
  content: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      content: z.string(),
      size: z.number(),
    })
  ),
});

const CreateCourseMaterial = sectionFormSchema.omit({
  id: true,
  content: true,
});

export async function createSections(formData: FormData) {
  const sectionsJson = formData.get("sections");
  const course_id = formData.get("courseId");
  const sections = JSON.parse(sectionsJson) as Section[];

  const sectionPromises = sections.map(async (section) => {
    try {
      const result = await sql`
        INSERT INTO course_material (course_id, blocks)
        VALUES (${course_id}, ${section.content})
        RETURNING id;
      `;
      const course_material_id = result.rows[0].id;
      return {
        id: section.id,
        name: section.name,
        course_material_id: course_material_id,
      };
    } catch (error) {
      // Handle errors appropriately (e.g., throw or log)
    }
  });

  const sectionArr = await Promise.all(sectionPromises);
  sql`
      UPDATE courses
      SET sections = ${sectionArr}
      WHERE id = ${course_id};
`;
  revalidatePath("/course");
  redirect(`/course/${course_id}`);
}

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  },
});

interface SignedURLResponse {
  failure?: string;
  success?: { url: string; id: string };
}

const allowedFileTypes = ["image/jpeg", "image/png"];

const maxFileSize = 1048576 * 10; // 1 MB

type GetSignedURLParams = {
  fileType: string;
  fileSize: number;
  checksum: string;
};
export async function getSignedURL({
  fileType,
  fileSize,
  checksum,
}: GetSignedURLParams): SignedURLResponse {
  const session = await auth();

  if (!session) {
    return { failure: "not authenticated" };
  }

  // first just make sure in our code that we're only allowing the file types we want
  if (!allowedFileTypes.includes(fileType)) {
    return { failure: "File type not allowed" };
  }

  if (fileSize > maxFileSize) {
    return { failure: "File size too large" };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateFileName(),
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: session.user!.id!,
    },
  });

  const signedURL = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: 60,
  });

  const id = signedURL.split("?")[0];
  console.log(id);

  return { success: { url: signedURL, id: id } };
}

export async function deleteImage(img_url: string) {
  const key = img_url.split("/").slice(-1)[0];

  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  };
  try {
    await s3Client.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    console.error(error);
  }
}
