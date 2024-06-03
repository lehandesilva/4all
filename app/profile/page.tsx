import { auth } from "@/auth";
import Profile from "../ui/profile/profile-view";
import Link from "next/link";
import CreateCourseBtn from "../ui/profile/create-btn";
export default async function Page() {
  const session = await auth();

  return (
    <>
      <Profile user={session?.user} />
      <Link href="profile/create">
        <CreateCourseBtn />
      </Link>
      {/* <ProfileCourses userCourses={userCourses} /> */}
    </>
  );
}
