"use client";
import { deleteCourse } from "@/app/server/actions";
import { MdDeleteOutline } from "react-icons/md";

export default function DeleteCourseBtn({ courseId }: { courseId: string }) {
  const handleDeleteCourse = async (courseId: string | null) => {
    if (courseId !== null) {
      await deleteCourse(courseId);
    }
  };
  return (
    <button className="ml-2" onClick={() => handleDeleteCourse(courseId)}>
      <MdDeleteOutline className="text-s-6 text-3xl" />
    </button>
  );
}
