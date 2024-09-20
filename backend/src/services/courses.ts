import { db } from "../drizzle/db";
import { coursesTable } from "../drizzle/schema";

export async function queryAllCoursesService() {
  const result = await db.select().from(coursesTable);
  return result;
}
