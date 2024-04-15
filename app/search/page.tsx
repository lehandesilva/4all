"use client";

import SideNav from "../ui/sidenav";
import CoursesGrid from "../ui/courses-grid";
import SearchBox from "../ui/searchBox";
import { courses } from "../lib/placeholder-data";

export default async function Search({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;

  return (
    <main>
      <SearchBox />
      <CoursesGrid heading="Results" data={courses} />
    </main>
  );
}
