"use client";
import { useState, useRef, useEffect, SetStateAction } from "react";
import { Course } from "@/app/server/definitions";
import { MdError } from "react-icons/md";
import Image from "next/image";
import { editCourse, geteSignedUrl } from "@/app/server/actions";
import clsx from "clsx";

export function EditCouseDetails({ courseDetails }: { courseDetails: Course }) {
  const [status, setStatus] = useState({ error: false, message: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  // Desctiption textarea auto-resize logic
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [descriptionVal, setDescriptionVal] = useState(
    courseDetails.description || ""
  );
  const handleDescriptionChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setEditted(true);
    setDescriptionVal(e.target.value);
  };
  useEffect(() => {
    (textAreaRef.current as HTMLTextAreaElement).style.height = "auto";
    (textAreaRef.current as HTMLTextAreaElement).style.height =
      (textAreaRef.current as HTMLTextAreaElement).scrollHeight + "px";
  }, [descriptionVal]);

  // Image change logic
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(
    courseDetails.img_url || undefined
  );
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditted(true);
    const file = e.target.files?.[0];
    setFile(file);

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    } else {
      setFileUrl(undefined);
    }
  };

  // edit submition
  const [editted, setEditted] = useState(false);
  const handleDetailChange = () => {
    setEditted(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let url = courseDetails.img_url;
    if (file) {
      setStatus({ error: false, message: "Uploading Image" });
      const sha256 = await computeSHA256(file);
      const signedUrl = await geteSignedUrl(file.type, file.size, sha256);
      if (signedUrl.failure !== undefined) {
        setStatus({ error: true, message: signedUrl.failure });
        setLoading(false);
        return;
      }
      url = signedUrl.success.url;
      await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file?.type,
        },
      });
      setStatus({ error: false, message: "File uploaded successfully" });
    }

    setStatus({ error: false, message: "Uploading Course Details" });
    await editCourse(
      courseDetails.id!,
      new FormData(event.target as HTMLFormElement),
      url!
    );

    setStatus({ error: false, message: "Submitted" });
    setLoading(false);
  };

  return (
    <div className=" w-full">
      <h1 className="text-5xl text-s-3 font-light mt-10 ml-28 mb-5">
        Edit Course Details
      </h1>
      {status.message !== "" && (
        <div className="w-full bg-p-3 flex p-1 items-center justify-center">
          {status.error ? <MdError className=" mx-2 text-s-1" /> : null}
          <p className="text-s-3 text-lg">{status.message}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col ml-12">
          <label className="text-s-3 mb-4">Name:</label>
          <input
            name="name"
            id="name"
            onChange={handleDetailChange}
            type="text"
            defaultValue={courseDetails.name || "Üntitled"}
            className="px-4 py-2 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 w-[40rem]"
          />

          <label className="text-s-3 mb-4 mt-8">Description:</label>

          <textarea
            name="description"
            id="description"
            ref={textAreaRef}
            onChange={handleDescriptionChange}
            rows={2}
            value={descriptionVal || "write something you dog!"}
            className="px-4 py-2 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 w-[50rem]"
          />

          <label className="text-s-3 mt-8 mb-4">Image:</label>
          {fileUrl ? (
            <Image
              src={fileUrl}
              alt={
                courseDetails.img_url
                  ? `${courseDetails.name} hero image`
                  : "unknown"
              }
              width={640}
              height={360}
              className="rounded-2xl"
            />
          ) : (
            <div className="w-[640px] h-[360px] bg-p-3 rounded-2xl border-dashed border-2 border-[#77848d]">
              <label
                htmlFor="media"
                className="hover:cursor-pointer text-[#77848d] w-full h-full flex justify-center items-center"
              >
                Upload Course Image
              </label>
            </div>
          )}
          <input
            type="file"
            id="media"
            name="media"
            accept="image/jpeg,image/png,image/webp"
            className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute -z-10"
            onChange={handleChangeImage}
          />
          <label
            htmlFor="media"
            className="mt-4 border-2 rounded-full px-2 py-1 text-s-2 font-medium border-s-2 w-48 cursor-pointer"
          >
            Change Course Image
          </label>

          <button
            type="submit"
            className={clsx(
              "px-4 py-2 rounded-full bg-p-3 text-s-3 self-end w-36 my-16 mr-16",
              { "bg-s-1 ": !loading && editted }
            )}
            disabled={!editted || loading}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
