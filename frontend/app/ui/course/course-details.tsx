import { Course } from "@/app/server/definitions";
import Link from "next/link";
import Image from "next/image";
import { IoStar } from "react-icons/io5";
import { userAuthCheck } from "@/app/server/actions";
export default async function CourseDetails({ course }: { course: Course }) {
  const user = await userAuthCheck();
  let owner: boolean = false;
  if (user?.id === course.instructor_id && user !== null) {
    owner = true;
  }
  return (
    <>
      {course.img_url && (
        <Image
          src={course.img_url}
          width={1920}
          height={1080}
          alt="Course Image"
          className="-z-20 top-0 absolute blur-sm"
        />
      )}
      <div className="bg-p-1 mt-[30vh] rounded-t-xl flex p-6">
        <div className="w-2/3 ml-4">
          <h1 className="text-s-3 text-4xl mb-1">{course.name}</h1>
          <p className="text-s-3 text-sm mb-14">by {course.instructor_name}</p>
          <p className="text-s-5 mb-8">{course.description}</p>
          <div className="flex">
            <p className="text-s-5 text-2xl mr-2 self-center">
              {course.rating}
            </p>
            <IoStar className="text-amber-400 text-2xl " />
          </div>
        </div>
        <div className="ml-16 mt-32">
          <div className="bg-p-2 rounded-2xl w-96 py-5">
            <p className="text-s-3 mb-5 ml-8">Sections</p>
            {course.sections?.map((section, index) => (
              <Link
                href={`/course/${course.id}/${section.id}`}
                key={section.id}
              >
                <div className="my-2 hover:bg-s-1 rounded-lg h-8">
                  <h3 className="text-s-4 ml-4">{section.name}</h3>
                </div>
              </Link>
            ))}
            {owner && (
              <Link href={`/course/${course.id}/edit`}>
                <div className="my-2 rounded-lg h-8 text-s-2 hover:bg-s-2 ">
                  <h3 className="text-s-2 hover:text-s-3 ml-4">Edit Course</h3>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
