"use client";

import styles from "./create-course-form.module.css";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/app/lib/definitions";

export default function CreateCourseForm({
  categories,
}: {
  categories: Category[];
}) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [status, setStatus] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
    console.log(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
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
                <option key={category.cat_Id} value={category.cat_Id}>
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
          />
        </div>

        <input
          type="file"
          onChange={handleFileChange}
          className={styles.fileInput}
          accept="image/jpeg,image/png,image/webp"
          name="media"
        />

        <input
          type="hidden"
          name="image_url"
          id="hiddenURL"
          aria-describedby="img-error"
        />

        <div>
          <Link href="/profile" className={styles.courseActionBtns}>
            Cancel
          </Link>
          <button type="submit" className={styles.courseActionBtns}>
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
}
