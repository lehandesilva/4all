"use client";

import styles from "./create-course-form.module.css";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createCourse } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { Category } from "@/app/lib/definitions";
import { getSignedURL, deleteImage } from "@/app/lib/actions";

export default function CreateCourseForm({
  categories,
}: {
  categories: Category[];
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createCourse, initialState);
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for preview image URL
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    if (e.target.files && e.target.files[0]) {
      // Read the selected file as a URL using FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result as string); // Set preview image URL
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setPreviewImage(null); // Clear preview if no file selected
    }
  };
  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      const signedURLResult = await getSignedURL({
        fileSize: file.size,
        fileType: file.type,
        checksum: await computeSHA256(file),
      });

      const { url, id } = signedURLResult.success;
      console.log({ url });
      console.log({ id });
      const result = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
      const hiddenInput = document.getElementById("hiddenURL"); // Access hidden input
      hiddenInput.value = id;
      console.log(hiddenInput.value);
      setImgUrl(id);
    }
  };

  const handleRemoveImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await deleteImage(imgUrl);
    setImgUrl(null);
    setPreviewImage(null);
  };

  return (
    <form action={dispatch}>
      <div>
        <label htmlFor="name" className={styles.label}>
          Name:
        </label>
        <input type="text" name="name" id="name" className={styles.textInput} />
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
        />
      </div>

      <input
        type="file"
        onChange={handleFileChange}
        accept="image/jpeg,image/png"
        name="file"
      />

      {previewImage && (
        <div className={styles.previewImageContainer}>
          <Image
            src={previewImage}
            alt="Course preview"
            width={200}
            height={200}
          />
        </div>
      )}

      <input type="hidden" name="image_url" id="hiddenURL" />
      {!imgUrl && (
        <button className={styles.uploadFileBtn} onClick={handleImageUpload}>
          Upload Image
        </button>
      )}

      {imgUrl && (
        <button className={styles.removeImageBtn} onClick={handleRemoveImage}>
          Remove Image
        </button>
      )}

      <div>
        <Link href="/profile" className="">
          Cancel
        </Link>
        <button type="submit">Create Course</button>
      </div>
    </form>
  );
}
