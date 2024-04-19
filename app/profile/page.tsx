import { auth } from "@/auth";
import { fetchUserByEmail, fetchCoursesByInstructorId } from "../lib/data";
import Profile from "../ui/profile/profile-view";
import ProfileCourses from "../ui/profile/profile-courses";
import Link from "next/link";
import CreateCourseBtn from "../ui/profile/create-btn";
export default async function Page() {
  const session = await auth();
  const user = await fetchUserByEmail(session?.user?.email);
  const userCourses = await fetchCoursesByInstructorId(user?.id);

  return (
    <>
      <Profile user={user} />
      <Link href="profile/create">
        <CreateCourseBtn />
      </Link>
      <ProfileCourses userCourses={userCourses} />
    </>
  );
}
