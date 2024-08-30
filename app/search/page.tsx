import CoursesGrid from "../ui/courses-grid";
import SearchBox from "../ui/searchBox";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";
  // const data = await fetchCoursesByQuery(query);
  // return (
  //   // <main>
  //   //   <div></div>
  //   //   <CoursesGrid
  //   //     heading="Results"
  //   //     data={
  //   //       data as {
  //   //         id: string;
  //   //         name: string;
  //   //         instructor_name: string;
  //   //         rating: string;
  //   //         img_url: string;
  //   //       }[]
  //   //     }
  //   //   />
  //   // </main>
  // );
}
