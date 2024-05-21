import "server-only";
import { postgresDB } from "./db/postgresDB";
import dbConnect from "./db/mongoDb";
import { auth } from "@/auth";
import z from "zod";
import bcrypt from "bcryptjs";

// make password more complex

// export async function createCourse();

const signupFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export async function createNewUser(formData: FormData) {
  const validatedFields = signupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
  }
}
