import { auth } from "@/auth";
import Profile from "../ui/profile/profile-view";
import Link from "next/link";
import { fetchAllCoursesByCurrentUser } from "../server/queries";
import { notFound } from "next/navigation";
export default async function Page() {
  const session = await auth();
  if (!session?.user.id) {
    notFound();
  }
  const userId = session?.user.id;

  const courses = await fetchAllCoursesByCurrentUser(userId);

  return (
    <>
      <Profile user={session?.user} courses={courses} />
    </>
  );
}
