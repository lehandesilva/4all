import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { coursesTable, reviewsTable, sectionsTable } from "../drizzle/schema";
import { block, section_for_course } from "../../../shared/definitions";

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

export async function insertNewCourse(
  name: string,
  description: string,
  userId: string,
  userName: string,
  url: string,
  category: string
) {
  const result = await db
    .insert(coursesTable)
    .values({
      name: name,
      description: description,
      instructor_id: userId,
      instructor_name: userName,
      img_url: url,
      category_id: category,
      public: false,
      rating: "0",
    })
    .returning({ id: coursesTable.id });

  return result[0].id;
}

export async function insertNewSectionIntoSectionTable(
  userId: string,
  sectionName: string,
  blocks: block[]
) {
  const sectionid_return = await db
    .insert(sectionsTable)
    .values({
      instructor_id: userId,
      name: sectionName,
      blocks: blocks,
    })
    .returning({ sectionId: sectionsTable.id });
  return sectionid_return[0].sectionId;
}

export async function querySectionsOfCourse(courseId: string) {
  const result = await db
    .select({ sections: coursesTable.sections })
    .from(coursesTable)
    .where(eq(coursesTable.id, courseId));
  return result[0].sections;
}

export async function insertSectionIntoCourseTable(
  newSection: section_for_course[] | null,
  courseId: string
) {
  await db
    .update(coursesTable)
    .set({ sections: newSection })
    .where(eq(coursesTable.id, courseId));
}

export async function updateSectionInSectionsTable(
  sectionName: string,
  blocks: block[],
  sectionId: string
) {
  await db
    .update(sectionsTable)
    .set({ name: sectionName, blocks: blocks })
    .where(eq(sectionsTable.id, sectionId));
}

export async function updateCourseTable(
  name: string,
  description: string,
  url: string,
  courseId: string
) {
  await db
    .update(coursesTable)
    .set({
      name: name,
      description: description,
      img_url: url,
    })
    .where(eq(coursesTable.id, courseId));
}

export async function updateCoursePublic(courseId: string) {
  await db
    .update(coursesTable)
    .set({ public: true })
    .where(eq(coursesTable.id, courseId));
}

export async function updateCoursePrivate(courseId: string) {
  await db
    .update(coursesTable)
    .set({ public: false })
    .where(eq(coursesTable.id, courseId));
}
