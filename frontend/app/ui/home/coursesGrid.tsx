import { Courses_for_page } from "../../server/definitions";
import Image from "next/image";
import Link from "next/link";

export default function CoursesGrid({
  courses,
  title,
}: {
  courses: Courses_for_page[];
  title: string;
}) {
  if (courses.length === 0 || !courses) {
    return (
      <div className="w-full p-16">
        <h1 className="text-s-5 text-3xl">{title}</h1>
        <p className="text-s-3 text-xl">No courses to dislay</p>
      </div>
    );
  } else {
    return (
      <div className="w-full p-16">
        <h1 className="text-s-5 text-3xl">{title}</h1>
        <div className="mt-8 grid grid-cols-4 justify-items-center p-16">
          {courses.map((course) => (
            <Link key={course.id} href={`/course/${course.id}`}>
              <div className="bg-p-2 rounded-xl flex flex-col  items-center hover:bg-s-6 w-[340px] h-[265px] hover:outline hover:outline-[10px] hover:outline-s-6 justify-center transition duration-300">
                <Image
                  src={course.img_url!}
                  alt={course.name!}
                  width={320}
                  height={320}
                  className="rounded-xl"
                />
                <div className="">
                  <h3 className="self-start text-s-4 mt-3">
                    {course.name!.length > 35
                      ? `${course.name!.substring(0, 35)}...`
                      : course.name}
                  </h3>
                  <p className="self-start text-gray-500">
                    {course.instructor_name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
