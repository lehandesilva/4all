"use client";

import { block } from "@/app/server/definitions";
import { MdOutlineDragIndicator } from "react-icons/md";

export default function Block({ block }: { block: block }) {
  if (block.type === "text") {
    return (
      <div className="flex items-center m-8">
        <div className="w-12">
          <MdOutlineDragIndicator className="text-s-3 text-2xl" />
        </div>
        <input
          type="text"
          defaultValue={block.content}
          className="px-4 py-2 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3"
        />
      </div>
    );
  } else if (block.type === "subtitle") {
    return (
      <div className="flex items-center m-8">
        <div className="w-12">
          <MdOutlineDragIndicator className="text-s-3 text-2xl" />
        </div>
        <input
          type="text"
          defaultValue={block.content}
          className="px-4 py-2 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 text-xl"
        />
      </div>
    );
  }
}
