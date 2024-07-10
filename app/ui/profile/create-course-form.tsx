"use client";

import styles from "./create-course-form.module.css";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/app/server/definitions";
import { createNewCourse, geteSignedUrl } from "@/app/server/actions";

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
      {status !== "" && (
        <div className={styles.statusContainer}>
          <p className={styles.statusMessage}>{status}</p>
        </div>
      )}
      <div className={styles.courseCreateSection}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className={styles.label}>
              Name:
            </label>
            <input
              aria-describedby="name-error"
              type="text"
              name="name"
              id="name"
              className={styles.textInput}
              required
            />
          </div>

          <div className={styles.categoryDropDown}>
            <label htmlFor="category">Category</label>
            <select name="categoryId" id="category">
              <option value="" disabled>
                Select a category
              </option>
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

          <div>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className={styles.textInput}
              aria-describedby="description-error"
              required
            />
          </div>

          <input
            type="file"
            onChange={handleFileChange}
            className={styles.fileInput}
            accept="image/jpeg,image/png,image/webp"
            name="media"
            required
          />
          <div className={styles.imagePreview}>
            {fileUrl ? (
              <Image
                src={fileUrl}
                alt={file ? file.name : "unknown"}
                width={200}
                height={200}
              />
            ) : (
              <div className={styles.noImagePreview}></div>
            )}
          </div>

          <div>
            <Link href="/profile" className={styles.courseActionBtns}>
              Cancel
            </Link>
            <button className={styles.courseActionBtns} disabled={loading}>
              Create Course
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
