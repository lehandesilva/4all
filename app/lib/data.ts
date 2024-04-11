import { sql } from "@vercel/postgres";
import {
  users,
  courses,
  course_material,
  categories,
} from "./placeholder-data";
import { User, Course, CourseMaterial, block } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchCourseById(id: string) {
  try {
    const course = courses.find((course) => course.id === id);
    return course;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to fetch course data");
  }
}

export async function fetchCourseMaterialById(id: string) {
  try {
    const courseMat = course_material.find(
      (course_material) => course_material.id === id
    );

    const isCourseMaterial = (data: any): data is CourseMaterial => {
      return (
        data &&
        Array.isArray(data.blocks) &&
        data.blocks.every(
          (block: CourseMaterial["blocks"][number]) =>
            block.type === "text" || block.type === "title"
        )
      );
    };

    if (isCourseMaterial(courseMat)) {
      return courseMat;
    } else {
      console.error("Unexpected data format for course material:", courseMat);
      return null; // Or throw an error if encountering unexpected data
    }
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to fetch course data");
  }
}

export async function fetchCategories() {}
