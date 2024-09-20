import Image from "next/image";
import { signOut } from "@/auth";
import { CurrentUserCourses } from "../../../../shared/definitions";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import DeleteCourseBtn from "./deleteCourseBtn";

export default function Profile({
  user,
  courses,
}: {
  user: any;
  courses: CurrentUserCourses[];
}) {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-p-3 rounded-2xl w-2/4 p-12 ">
        <div className="flex justify-between">
          <div>
            <h2 className="text-s-3 text-lg py-3">{user.name}</h2>
            <p className="text-s-5 text-lg py-3">{`Email: ${user.email}`}</p>
          </div>
          <div className="">
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button className="px-4 py-2 bg-s-6 rounded-full text-s-3 ">
                <p>Sign Out</p>
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-s-3 text-2xl pt-3">{`Courses created by ${user.name}`}</h1>
          <button>
            <Link href={"/profile/create"}>
              <p className="px-4 py-2 bg-s-1 rounded-full text-s-3 ">
                Create New Course
              </p>
            </Link>
          </button>
        </div>
        {courses.map((course, index) => (
          <div
            key={index}
            className="flex justify-between hover:bg-p-1 bg-p-2 rounded-2xl shadow-lg hover:shadow-2xl px-5 py-4 my-5"
          >
            <div className="flex">
              <Image
                src={course.img_url!}
                alt={course.name || "Untitled Course"}
                width={240}
                height={240}
                className="rounded-xl"
              />
              <h3 className="ml-10 text-s-5 text-lg">{course.name}</h3>
            </div>
            <div className="flex flex-col justify-between">
              <p className="w-min h-min px-3 py-1 bg-s-6 text-sm rounded-full text-s-3">
                {course.public ? "Public" : "Private"}
              </p>
              <div className="w-[70.5px]">
                <button className="">
                  <Link href={`/course/${course.id}/edit`}>
                    <CiEdit className="text-s-1 text-3xl" />
                  </Link>
                </button>
                <DeleteCourseBtn courseId={course.id!} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
