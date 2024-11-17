"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { cookies } from "next/headers";
import { userAuth, block } from "../../../shared/definitions";

const styleSchema = z.object({
  color: z.string().nullable(),
  size: z.number().nullable(),
  align: z.string().nullable(),
});

// Define the schema for the block_for_editor object
const blockForEditorSchema = z.object({
  id: z.string(),
  type: z.enum(["text", "image", "video", "quiz", "subtitle"]).or(z.string()),
  content: z.string(),
  style: styleSchema,
});

// Define the schema for an array of block_for_editor objects
const blocksForEditorSchema = z.array(blockForEditorSchema);

export async function createSection(
  courseId: string,
  blocks_from_editor: block[],
  sectionId: string,
  sectionName: string
) {
  const user = await userAuthCheck();
  if (!user) {
    redirect("/signup");
  }
  const validatedFields = blocksForEditorSchema.safeParse(blocks_from_editor);

  if (!validatedFields.success) {
    return { error: true, message: "Maneee who you fuckin wit" };
  }

  const blocks = validatedFields.data;

  // First check if the section exists and if it does then update it, else use insert for it.
  if (sectionId === "new") {
    let newSectionId: string;
    try {
      const token = cookies().get("token")?.value;
      const response = await fetch(
        `${process.env.API_URL}/users/newSection/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            sectionName: sectionName,
            blocks: blocks,
          }),
        }
      );
      const resData = await response.json();
      if (response.status !== 201) {
        return resData.message;
      }
      newSectionId = resData.sectionId;
    } catch (error) {
      console.log(error);
      return {
        error: true,
        message: "Database Errorr: Failed to create section",
      };
    }
    revalidatePath("/");
    redirect(`/course/${courseId}/${newSectionId}`);
  } else {
    try {
      const token = cookies().get("token")?.value;
      const response = await fetch(
        `${process.env.API_URL}/updateSection/${courseId}/${sectionId}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            sectionName: sectionName,
            blocks: blocks,
          }),
        }
      );

      const resData = await response.json();

      if (response.status !== 201) {
        return { error: true, message: resData.message };
      }
    } catch (error) {
      console.log(error);
      return {
        error: true,
        message: "Database Error: Failed to create section",
      };
    }
    revalidatePath("/");
    redirect(`/course/${courseId}/${sectionId}`);
  }
}

// make course public logic
export async function makeCoursePublic(courseId: string) {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.API_URL}/users/updateCourse/public/${courseId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) {
      const resData = await response.json();
      return { error: true, message: resData.message };
    }
  } catch (error) {
    return { error: true, message: "Database Error: Failed to update course" };
  }
}

// make course private
export async function makeCoursePrivate(courseId: string) {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.API_URL}/users/updateCourse/private/${courseId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) {
      const resData = await response.json();
      return { error: true, message: resData.message };
    }
  } catch (error) {
    return { error: true, message: "Database Error: Failed to update course" };
  }
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
  const user = await userAuthCheck();
  if (!user) {
    redirect("/signup");
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
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.API_URL}/users/updateCourse/${courseId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
          url: signedURL.split("?")[0],
        }),
      }
    );
    const resData = await response.json();
    if (response.status !== 200) {
      return { error: true, message: resData.message };
    }
  } catch (error) {
    return { error: true, message: "Database Error: Failed to update course" };
  }
  revalidatePath("/");
  redirect(`/course/${courseId}`);
}

const reviewValidation = z.object({
  review: z.string(),
});

export async function reviewCourse(courseId: string, review: string) {
  const user = await userAuthCheck();
  if (!user) {
    redirect("/signup");
  }
  const validatedFields = reviewValidation.safeParse({ review });

  if (!validatedFields.success) {
    return { error: true, message: "Maneee who you fuckin wit" };
  }

  const review_validated = validatedFields.data;
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.API_URL}/course/newReview/${courseId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          review: review_validated.review,
        }),
      }
    );

    const resData = await response.json();

    if (response.status !== 201) {
      return { error: true, message: resData.message };
    }
  } catch (error) {
    return {
      error: true,
      message: "Database Error: Comment didn't go through",
    };
  }
  revalidatePath("/");
  redirect(`/course/${courseId}`);
}

//////////////////////////////////////// Tested actions ////////////////////////////////////////

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];
const acceptedTypes_EDITOR = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/mkv",
];
const maxSize = 1024 * 1024 * 10;

const courseFormValidation = z.object({
  name: z.string(),
  description: z.string().min(30),
  category: z.string(),
});

const signupFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.string(),
  password: z.string().min(8),
});

export async function geteSignedUrl(
  type: string,
  size: number,
  checksum: string
) {
  const user = await userAuthCheck();
  if (!user) {
    return { failure: "Not authenticated" };
  }

  if (!acceptedTypes_EDITOR.includes(type)) {
    return { failure: "Invalid file type" };
  }

  if (size > maxSize) {
    return { failure: "Invalid file size" };
  }

  const putObjctCommand = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: user.id !== undefined ? user.id : "",
    },
  });

  const signedURL = await getSignedUrl(s3, putObjctCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedURL } };
}

export async function createNewCourse(formData: FormData, signedURL: string) {
  const user = await userAuthCheck();
  if (!user) {
    redirect("/signup");
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
    const token = cookies().get("token")?.value;
    const response = await fetch(`${process.env.API_URL}/users/newCourse`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        url: signedURL.split("?")[0],
        category: category,
      }),
    });

    const resData = await response.json();
    courseId = resData.result;
  } catch (error) {
    return { error: true, message: "Database Error: Failed to create course" };
  }
  if (courseId) {
    revalidatePath("/");
    redirect(`/course/${courseId}`);
  }
}

// Delete course
export async function deleteCourse(courseId: string) {
  try {
    const token = cookies().get("token")?.value;
    await fetch(`${process.env.API_URL}/users/${courseId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: true, message: "An error occurred" };
  }
  revalidatePath("/");
  redirect("/");
}

export async function authenticate(formData: FormData) {
  const password = formData.get("password");
  const email = formData.get("email");

  try {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const resData = await response.json();

    if (response.ok) {
      cookies().set({
        name: "token",
        value: resData.token,
        httpOnly: true, // Prevent client-side access
        secure: true, // Send only over HTTPS
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 1 month token expiration
      });
    }
  } catch (error) {
    console.error(error);
    return { error: true, message: "An error occurred" };
  }
  redirect("/");
}

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

  const { name, email, age, password } = validatedFields.data;

  // Insert user into database
  try {
    const response = await fetch(`${process.env.API_URL}/auth/signup`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        age: age,
      }),
    });
    if (response.status === 409) {
      return { error: true, message: "Maneee who you fuckin wit" };
    }
  } catch (error) {
    console.log(error);
    return { error: true, message: "Database Error: Failed to create user" };
  }
  redirect("/login");
}

export async function userAuthCheck() {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(`${process.env.API_URL}/auth/check`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data.authenticated ? (data.user as userAuth) : null;
  } catch (error) {
    return null; // Not authenticated or request failed
  }
}

export async function signOut() {
  cookies().delete("token");
  redirect("/");
}
