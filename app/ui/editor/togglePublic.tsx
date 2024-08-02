"use client";

import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { useState } from "react";
import { makeCoursePrivate, makeCoursePublic } from "@/app/server/actions";

export default function TogglePublic({
  coursePublic,
  courseId,
}: {
  coursePublic: boolean | null;
  courseId: string;
}) {
  // Toggle button logic
  const [togglePublic, setTogglePublic] = useState(coursePublic);
  const handleToggle = async () => {
    if (togglePublic) {
      await makeCoursePrivate(courseId);
    } else {
      await makeCoursePublic(courseId);
    }
    setTogglePublic(!togglePublic);
  };
  return (
    <div className="flex items-center">
      <h3 className="text-sm text-s-5 mr-4">{`Make course ${
        togglePublic ? "private" : "public"
      }`}</h3>
      <button type="button" onClick={handleToggle} className="mr-12">
        {togglePublic ? (
          <BsToggleOn className="text-5xl text-s-1" />
        ) : (
          <BsToggleOff className="text-5xl text-s-6" />
        )}
      </button>
    </div>
  );
}
