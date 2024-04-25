import { auth } from "@/auth";
import { fetchUserByEmail, fetchCoursesByInstructorId } from "../lib/data";
import Profile from "../ui/profile/profile-view";
import ProfileCourses, {
  UserCoursesProps,
} from "../ui/profile/profile-courses";
import Link from "next/link";
import CreateCourseBtn from "../ui/profile/create-btn";
import { Course, User } from "../lib/definitions";
export default async function Page() {
  const session = await auth();
  const userEmail = session?.user?.email ?? ""; // Use empty string as default

  const user = userEmail ? await fetchUserByEmail(userEmail) : null;
  const userWithType = user as User;
  const userCourses = (await fetchCoursesByInstructorId(
    userWithType?.id
  )) as UserCoursesProps[];

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
