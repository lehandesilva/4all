import "server-only";
import { postgresDB } from "./db/postgresDB";
import { categoriesTable, users } from "./db/schema";
import { eq } from "drizzle-orm";

export async function fetchCategories() {
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
