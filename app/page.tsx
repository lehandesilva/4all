import { fetchCourses } from "@/app/lib/data";
import CoursesGrid from "./ui/courses-grid";

type Course = {
  id: string;
  name: string;
  instructor_name: string;
  rating: string;
  img_url: string;
};

export default async function Home() {
  const courses = await fetchCourses();
  return (
    <main>
      {/* <CoursesGrid heading="Recommendations" data={courses as Course[]} /> */}
    </main>
  );
}
