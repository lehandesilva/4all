import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { users } from "../drizzle/schema";
import { emit } from "process";

export async function createUser(
  name: string,
  email: string,
  password: string,
  age: string
) {
  const result = await db
    .insert(users)
    .values({
      name: name,
      email: email,
      password: password,
      age: age,
      role: "user",
    })
    .returning({ userId: users.id });
  return result;
}

export async function checkEmailExists(email: string) {
  const result = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.email, email));
  return result;
}

export async function getUserInfo(email: string) {
  const result = await db
    .select({ email: users.email, password: users.password, role: users.role })
    .from(users)
    .where(eq(users.email, email));
  return result;
}
