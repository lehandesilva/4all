import { db } from "../drizzle/db";
import { categoriesTable } from "../drizzle/schema";

export async function queryCategories() {
  const result = await db.select().from(categoriesTable);

  return result;
}
