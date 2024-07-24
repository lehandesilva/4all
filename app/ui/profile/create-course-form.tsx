"use client";

// import styles from "./create-course-form.module.css";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/app/server/definitions";
import { createNewCourse, geteSignedUrl } from "@/app/server/actions";
import { MdError } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";

export default function CreateCourseForm({
  categories,
}: {
  categories: Category[];
}) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState("");
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus("");
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus("Submitting");
    if (!file) {
      setStatus("Course Image required");
      setLoading(false);
      return;
    } else {
      setStatus("Uploading Image");
      const sha256 = await computeSHA256(file);
      const signedUrl = await geteSignedUrl(file.type, file.size, sha256);
      if (signedUrl.failure !== undefined) {
        setStatus(signedUrl.failure);
        setLoading(false);
        return;
      }
      const url = signedUrl.success.url;
      await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file?.type,
        },
      });
      const result = await createNewCourse(
        new FormData(event.target as HTMLFormElement),
        url
      );
      if (result?.error) {
        setStatus(result.message);
        setLoading(false);
        return;
      }
      setStatus("Submitted");
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-5xl text-s-3 font-light mt-20 ml-72 mb-5">
        Create Course
      </h1>
      {status !== "" && (
        <div className="w-full bg-p-3 flex p-1 items-center justify-center">
          <MdError className=" mx-2 text-s-1" />
          <p className="text-s-3 text-lg">{status}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex mt-8 w-full justify-evenly">
          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              id="name"
              className="px-4 py-2 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 w-[40rem]"
              placeholder="Title"
              required
            />
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              className="px-4 py-2 mt-12 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 w-[35rem] h-52 "
              required
            />

            <select
              name="categoryId"
              id="category"
              className="px-4 py-2 mt-12 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 w-52"
              defaultValue="Category"
            >
              {categories?.length > 0 ? (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option value="">No categories available</option>
              )}
            </select>
          </div>
          <div className="flex flex-col">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute -z-10"
              accept="image/jpeg,image/png,image/webp"
              name="media"
              required
              id="media"
            />
            {fileUrl ? (
              <Image
                src={fileUrl}
                alt={file ? file.name : "unknown"}
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

            <div className="mt-16">
              <Link href="/profile">
                <button className="px-4 py-2 border-2 border-s-2 rounded-full text-s-2 hover:bg-s-2 hover:text-s-3">
                  Cancel
                </button>
              </Link>
              <button
                className="px-4 py-2 bg-s-1 rounded-full text-s-3 ml-12"
                type="submit"
                disabled={loading}
              >
                Create Course
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
