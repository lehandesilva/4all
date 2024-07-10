import "server-only";
import { postgresDB } from "./db/postgresDB";
import { categoriesTable, coursesTable, users } from "./db/schema";
import { eq } from "drizzle-orm";

export async function fetchCourseDeets(courseId: string) {
  const result = await postgresDB
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.id, courseId));
  return result[0];
}

export async function fetchCourseSections(courseId: string) {
  // get from mongodb
  // check if its better to get individual sections or the whole thing
}

export default async function fetchCategories() {
  const result = await postgresDB.select().from(categoriesTable);

  return result;
}

export async function checkEmailExists(email: string) {
  const result = await postgresDB
    .select({ email: users.email })
    .from(users)
    .where(eq(users.email, email));

  return result;
}

export async function fetchUserById(id: string) {
  const result = await postgresDB.select().from(users).where(eq(users.id, id));

  return result[0];
}

export async function fetchUserByEmail(email: string) {
  const result = await postgresDB
    .select()
    .from(users)
    .where(eq(users.email, email));

  return result[0];
}
