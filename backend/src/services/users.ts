import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { coursesTable, reviewsTable } from "../drizzle/schema";

export async function queryCoursesFromInstructorById(userId: string) {
  const result = await db
    .select({
      id: coursesTable.id,
      name: coursesTable.name,
      public: coursesTable.public,
      rating: coursesTable.rating,
      img_url: coursesTable.img_url,
      category_id: coursesTable.category_id,
    })
    .from(coursesTable)
    .where(eq(coursesTable.instructor_id, userId));

  return result;
}

export async function queryCourseInstructorFromCourseId(courseId: string) {
  const result = db
    .select({ instructor_id: coursesTable.instructor_id })
    .from(coursesTable)
    .where(eq(coursesTable.id, courseId));
  return result;
}

export async function deleteCourseService(courseId: string) {
  await db.delete(reviewsTable).where(eq(reviewsTable.course_id, courseId));
  await db.delete(coursesTable).where(eq(coursesTable.id, courseId));
}
