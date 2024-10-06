import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { coursesTable, reviewsTable, sectionsTable } from "../drizzle/schema";

export async function queryAllCoursesService() {
  const result = await db
    .select({
      id: coursesTable.id,
      name: coursesTable.name,
      instructor_name: coursesTable.instructor_name,
      rating: coursesTable.rating,
      img_url: coursesTable.img_url,
    })
    .from(coursesTable)
    .where(eq(coursesTable.public, true));
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

export async function insertNewReview(
  courseId: string,
  userId: string,
  userName: string,
  review: string
) {
  await db.insert(reviewsTable).values({
    course_id: courseId,
    user_id: userId,
    user_name: userName,
    comment: review,
  });
}

export async function queryAllSectionsOfACourse(courseId: string) {
  const sectionResults = await db
    .select({ sections: coursesTable.sections })
    .from(coursesTable)
    .where(eq(coursesTable.id, courseId));

  return sectionResults[0];
}

export async function querySectionById(sectionId: string) {
  const result = await db
    .select()
    .from(sectionsTable)
    .where(eq(sectionsTable.id, sectionId));

  return result[0];
}

export async function queryCourseDetails(courseId: string) {
  const result = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.id, courseId));

  return result[0];
}
