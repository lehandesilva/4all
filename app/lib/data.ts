import { sql } from "@vercel/postgres";
import { User, Course, CourseMaterial } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchCourse() {
  try {
    const data = await sql<CourseMaterial>`SELECT * FROM course_material`;

    console.log("Data fetch successful");

    return data.rows;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to fetch course data");
  }
}
