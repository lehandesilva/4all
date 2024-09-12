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
      <div className="flex flex-col items-center">
        <Link href="edit?sectionId=new">
          <button className="mt-4 font-medium px-4 py-2 border-2 border-s-2 rounded-full text-s-2 hover:bg-s-2 hover:text-s-3">
            Add New Section
          </button>
        </Link>
        <Link href="edit">
          <button className="mt-8 font-medium px-4 py-2 border-2 border-s-2 rounded-full text-s-2 hover:bg-s-2 hover:text-s-3">
            Edit Course Details
          </button>
        </Link>
      </div>
    </div>
  );
}
