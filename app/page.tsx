import { fetchCoursesForHomePage } from "./server/queries";
import CoursesGrid from "./ui/home/coursesGrid";
export default async function Home() {
  const courses = await fetchCoursesForHomePage();
  return (
    <main>
      <CoursesGrid courses={courses} title="Recommended" />
    </main>
  );
}
