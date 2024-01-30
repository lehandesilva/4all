import SideNav from "../ui/sidenav";
import CoursesGrid from "../ui/courses-grid";
import { courses } from "../lib/placeholder-data";

export default function Search() {
  return (
    <main>
      <SideNav />
      <CoursesGrid heading="Results" data={courses} />
    </main>
  );
}
