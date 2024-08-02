"use client";
import { section_for_course } from "@/app/server/definitions";
import clsx from "clsx";
import Link from "next/link";

export default function SectionMap({
  sections,
  sectionId,
  courseId,
}: {
  sections: section_for_course[] | null;
  sectionId: string | undefined;
  courseId: string;
}) {
  return (
    <div className="w-96 h-dvh px-4 py-2 bg-p-2 shadow-xl">
      <div>
        <h3 className="mt-4 p-3 font-semibold text-lg text-s-3">Sections</h3>
        {sections?.map((section) => (
          <div
            className={clsx(
              "pl-3 py-2 m-2 rounded-lg text-s-3 hover:bg-p-3 hover:cursor-pointer",
              {
                "bg-s-1 border-4 border-s-1 hover:bg-s-1":
                  sectionId === section.id,
              }
            )}
            key={section.id}
          >
            <Link href={`edit?sectionId=${section.id}`}>
              <h3>{section.name}</h3>
            </Link>
          </div>
        ))}
        <button className="mt-4 border-2 rounded-full px-2 py-1 text-s-2 font-medium border-s-2">
          Add New Section
        </button>
      </div>
      <div>
        <Link href="edit">
          <button className="mt-6 border-2 rounded-full px-2 py-1 text-s-2 font-medium border-s-2">
            Edit Course Details
          </button>
        </Link>
      </div>
    </div>
  );
}
