"use server";
import { postgresDB } from "./db/postgresDB";
import dbConnect from "./db/mongoDb";
import { signIn } from "@/auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { usersTable } from "./db/schema";
import { checkEmailExists } from "./queries";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

// make password more complex
// export async function createCourse();

export async function authenticate(prevState: any, formData: FormData) {
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
  }
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
    const result = await postgresDB.insert(usersTable).values({
      name: name,
      email: email,
      password: hashedPassword,
      age: age,
      role: "user",
    });
  } catch (error) {
    return { error: true, message: "Database Error: Failed to create user" };
  }
}
