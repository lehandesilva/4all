"use server";
import { postgresDB } from "./db/postgresDB";

import { auth, signIn } from "@/auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { coursesTable, sectionsTable, users } from "./db/schema";
import { checkEmailExists } from "./queries";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { eq } from "drizzle-orm";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  },
});

const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxSize = 1024 * 1024 * 10;

export async function geteSignedUrl(
  type: string,
  size: number,
  checksum: string
) {
  const session = await auth();
  if (!session) {
    return { failure: "Not authenticated" };
  }
  if (!acceptedTypes.includes(type)) {
    return { failure: "Invalid file type" };
  }

  if (size > maxSize) {
    return { failure: "Invalid file size" };
  }

  const putObjctCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: session.user.id !== undefined ? session.user.id : "",
    },
  });

  const signedURL = await getSignedUrl(s3, putObjctCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedURL } };
}

export async function authenticate(formData: FormData) {
  const password = formData.get("password");
  const email = formData.get("email");

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
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

const courseFormValidation = z.object({
  name: z.string(),
  description: z.string().min(30),
  category: z.string(),
});

export async function createNewCourse(formData: FormData, signedURL: string) {
  const session = await auth();
  if (!session) {
    return { error: true, message: "Not authenticated" };
  }

  const validatedFields = courseFormValidation.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("categoryId"),
  });

  if (!validatedFields.success) {
    let errorMessage = "";
    validatedFields.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });
    return { error: true, message: errorMessage };
  }

  if (!signedURL) {
    return { error: true, message: "Image was not uploaded" };
  }

  const { name, description, category } = validatedFields.data;

  let courseId: string | null = null;

  try {
    const result = await postgresDB
      .insert(coursesTable)
      .values({
        name: name,
        description: description,
        instructor_id: session.user.id,
        instructor_name: session.user.name,
        img_url: signedURL.split("?")[0],
        category_id: category,
        public: false,
      })
      .returning({ id: coursesTable.id });

    courseId = result[0].id;
  } catch (error) {
    return { error: true, message: "Database Error: Failed to create course" };
  }
  revalidatePath("/");
  redirect(`/course/${courseId}`);
}

const signupFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.string(),
  password: z.string().min(8),
});

export async function createNewUser(formData: FormData) {
  const validatedFields = signupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    age: formData.get("age"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    let errorMessage = "";
    validatedFields.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });
    return { error: true, message: errorMessage };
  }

  // Check if user already exists
  const { name, email, age, password } = validatedFields.data;

  try {
    const existingUser = await checkEmailExists(email);
    if (existingUser.length > 0) {
      return { error: true, message: "User already exists" };
    }
  } catch (err) {
    return { error: true, message: "Database Error: Failed to check email" };
  }
  // If user does not exist, create new user
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Insert user into database
  try {
    const result = await postgresDB.insert(users).values({
      name: name,
      email: email,
      password: hashedPassword,
      age: age,
      role: "user",
    });
    redirect("/login");
  } catch (error) {
    console.log(error);
    return { error: true, message: "Database Error: Failed to create user" };
  }
}

const editCourseFormSchema = z.object({
  name: z.string(),
  content: z.string(),
});

export async function createSection(courseId: string, formData: FormData) {
  const session = await auth();
  if (!session) {
    return { error: true, message: "Not authenticated" };
  }
  const validatedFields = editCourseFormSchema.safeParse({
    name: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return { error: true, message: "Pleas" };
  }

  const { name, content } = validatedFields.data;

  try {
    const sectionId = await postgresDB
      .insert(sectionsTable)
      .values({
        instructor_id: session.user.id,
        name: name,
        blocks: [
          {
            type: "text",
            content: content,
            style: {
              color: "black",
              size: 2,
              align: "center",
            },
          },
        ],
      })
      .returning({ sectionId: sectionsTable.id });
    // Insert section into postgresdb
    // Need to update the sections array by getting the sections and then update it
    const result = await postgresDB
      .select({ sections: coursesTable.sections })
      .from(coursesTable)
      .where(eq(coursesTable.id, courseId));

    const newSection =
      result[0].sections !== null
        ? [...result[0].sections, { id: sectionId[0].sectionId, name: name }]
        : [{ id: sectionId[0].sectionId, name: name }];

    //update the result
    await postgresDB
      .update(coursesTable)
      .set({ sections: newSection })
      .where(eq(coursesTable.id, courseId));
  } catch (error) {
    return { error: true, message: "Database Error: Failed to create section" };
  }
}

// make course public logic
export async function makeCoursePublic(courseId: string) {
  await postgresDB
    .update(coursesTable)
    .set({ public: true })
    .where(eq(coursesTable.id, courseId));
}

// make course private
export async function makeCoursePrivate(courseId: string) {
  await postgresDB
    .update(coursesTable)
    .set({ public: false })
    .where(eq(coursesTable.id, courseId));
}

// Edit course

const editCourseValidation = z.object({
  name: z.string(),
  description: z.string().min(30),
});
export async function editCourse(
  courseId: string,
  formData: FormData,
  signedURL: string
) {
  const session = await auth();
  if (!session) {
    return { error: true, message: "Not authenticated" };
  }

  const validatedFields = editCourseValidation.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    let errorMessage = "";
    validatedFields.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });
    return { error: true, message: errorMessage };
  }

  const { name, description } = validatedFields.data;

  try {
    const result = await postgresDB
      .update(coursesTable)
      .set({
        name: name,
        description: description,
        img_url: signedURL.split("?")[0],
      })
      .where(eq(coursesTable.id, courseId));
    return { error: false, message: "Course updated successfully" };
  } catch (error) {
    return { error: true, message: "Database Error: Failed to update course" };
  }
}

// Delete course
