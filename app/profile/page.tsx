import { auth } from "@/auth";
// import { fetchUserByEmail, fetchCoursesByInstructorId } from "../lib/data";
export default async function Page() {
  // const session = await auth();
  // const userDetails = await fetchUserByEmail(session?.user?.email);
  // const userCourses = await fetchCoursesByInstructorId(session?.user?.id);
  return (
    <>
      {/* <h1>{userDetails?.name}</h1>
      <p>{`Email: ${userDetails?.email}`}</p>
      <p>{`Courses created by ${userDetails?.name}`}</p>
      {userCourses.map((course) => )} */}
      <p>Profile Page</p>
    </>
  );
}
