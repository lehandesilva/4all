import { fetchCourses } from "@/app/lib/data";
import CoursesGrid from "./ui/courses-grid";

export default async function Home() {
  const courses = await fetchCourses();
  return (
    <main>
      <CoursesGrid heading="Recommendations" data={courses} />
    </main>
  );
}
