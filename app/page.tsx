import classes from "./page.module.css";
import Header from "./ui/header";
import SearchBox from "./ui/searchBox";
import SideNav from "./ui/sidenav";
import { fetchCourse } from "@/app/lib/data";
import CoursesGrid from "./ui/courses-grid";
import { courses } from "@/app/lib/placeholder-data";

export default async function Home() {
  return (
    <main>
      {/* <Header /> */}
      <SearchBox />

      {/* <CoursesGrid heading="Recommendations" data={courses} /> */}
    </main>
  );
}
