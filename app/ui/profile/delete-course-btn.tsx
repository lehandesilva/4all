"use client";
import { deleteCourse } from "@/app/lib/actions";
import styles from "./delete-course-btn.module.css";
import { useState } from "react";

export default function DeleteCourseBtn({ courseId }: { courseId: string }) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDeleteClick = async () => {
    await deleteCourse(courseId);
    setShowConfirmDialog(false); // Close dialog after deletion
  };

  const handleConfirm = () => {
    handleDeleteClick();
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <button className={styles.btn} onClick={() => setShowConfirmDialog(true)}>
        Delete Course
      </button>
      {showConfirmDialog && (
        <div className={styles.confirmDialog}>
          <h3>Are you sure you want to delete this course?</h3>
          <button
            className={`${styles.btn} ${styles.confirm}`}
            onClick={handleConfirm}
          >
            Yes, Delete
          </button>

          <button
            className={`${styles.btn} ${styles.cancel}`}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
}
