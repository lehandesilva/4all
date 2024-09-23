import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { users } from "../drizzle/schema";

export async function findUserByEmail(email: string) {
  const result = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.email, email));
  if (result.length === 0) {
    return null;
  }
  return result;
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  age: string
) {
  const result = await db.insert(users).values({
    name: name,
    email: email,
    password: password,
    age: age,
    role: "user",
  });
}
