import { auth } from "@/auth";
import Profile from "../ui/profile/profile-view";
import Link from "next/link";
export default async function Page() {
  const session = await auth();

  return (
    <>
      <Profile user={session?.user} />

      {/* <ProfileCourses userCourses={userCourses} /> */}
    </>
  );
}
