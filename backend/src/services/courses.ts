import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { coursesTable } from "../drizzle/schema";

export async function queryAllCoursesService() {
  const result = await db.select().from(coursesTable);
  return result;
}

export async function getCourseInstructorById(courseId: string) {
  const result = await db
    .select({
      courseId: coursesTable.id,
      instructorId: coursesTable.instructor_id,
    })
    .from(coursesTable)
    .where(eq(coursesTable.id, courseId));
  return result[0];
}
