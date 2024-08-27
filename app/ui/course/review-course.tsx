"use client";
import { reviewCourse } from "@/app/server/actions";
import { useState } from "react";
import clsx from "clsx";
export default function ReviewCourse({ courseId }: { courseId: string }) {
  const [enableComment, setEnableComment] = useState<boolean>(false);
  const uploadReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnableComment(false);
    // trim it and check if the value is empty and if it isnt then call the function
    // even on the server side trim and check if the value is empty and then insert to db
    const input = e.currentTarget.querySelector<HTMLInputElement>("#review");
    if (input) {
      if (input?.value.trim() !== "") {
        console.log(input.value);
        await reviewCourse(courseId, input?.value);
      }
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== "") {
      setEnableComment(true);
    } else {
      setEnableComment(false);
    }
  };
  return (
    <form onSubmit={uploadReview}>
      <div className="w-4/12 mt-6 mb-4">
        <input
          type="text"
          className="px-4 py-2 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 w-full"
          id="review"
          placeholder="Add Review"
          onChange={handleCommentChange}
        />
        <div className="flex justify-end mt-2">
          <button
            className={clsx("px-4 py-2 rounded-full", {
              "bg-s-1 text-s-4": enableComment === true,
              "bg-p-3 text-gray-500 cursor-not-allowed":
                enableComment === false,
            })}
            disabled={!enableComment}
          >
            Comment
          </button>
        </div>
      </div>
    </form>
  );
}
