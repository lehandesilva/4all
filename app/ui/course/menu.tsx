"use client";
import { section_for_course } from "@/app/server/definitions";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { RiMenuFill } from "react-icons/ri";

export default function SectionMenu({
  sectionName,
  all_sections_details,
  currentSectionId,
}: {
  sectionName: string;
  all_sections_details: section_for_course[] | null;
  currentSectionId: string;
}) {
  const [expandedMenu, setExpandedMenu] = useState<boolean>(false);
  const expandMenu = () => {
    setExpandedMenu(!expandedMenu);
  };
  return (
    <div
      className={clsx(
        "w-1/3 absolute z-10 bg-p-3 py-3 rounded-[24px] flex transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 duration-300",
        {
          "h-auto": expandedMenu === true,
        },
        {
          "": expandedMenu === false,
        }
      )}
      onMouseEnter={expandMenu}
      onMouseLeave={expandMenu}
    >
      <RiMenuFill className="text-s-5 ml-7 mt-[0.35rem]" />
      <div>
        {expandedMenu === false ? (
          <p className="text-s-5 ml-7 text-xl">{sectionName}</p>
        ) : (
          all_sections_details?.map((section) => (
            <div key={section.id}>
              <Link key={section.id} href={`${section.id}`}>
                <p
                  className={clsx("text-s-5 ml-7 text-xl", {
                    "border-b-2 my-2 text-s-3 text-2xl":
                      section.id === currentSectionId,
                  })}
                >
                  {section.name}
                </p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
