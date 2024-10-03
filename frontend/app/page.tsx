import { Courses_for_page } from "../../shared/definitions";
import { fetchCoursesForHomePage } from "./server/queries";
import CoursesGrid from "./ui/home/coursesGrid";
export default async function Home() {
  const courses: Courses_for_page[] = await fetchCoursesForHomePage();

  return (
    <main>
      <CoursesGrid courses={courses} title="Recommended" />
    </main>
  );
}
