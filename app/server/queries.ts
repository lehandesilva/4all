import "server-only";
import { postgresDB } from "./db/postgresDB";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";

export async function checkEmailExists(email: string) {
  const result = await postgresDB
    .select({ email: usersTable.email })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return result;
}
