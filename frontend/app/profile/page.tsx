import Profile from "../ui/profile/profile-view";
import Link from "next/link";
import { fetchAllCoursesByCurrentUser } from "../server/queries";
import { notFound } from "next/navigation";
import { userAuthCheck } from "../server/actions";
export default async function Page() {
  const user = await userAuthCheck();
  if (!user?.id) {
    notFound();
  }
  const userId = user.id;

  const courses = await fetchAllCoursesByCurrentUser(userId);

  return (
    <>
      <Profile user={user} courses={courses} />
    </>
  );
}
