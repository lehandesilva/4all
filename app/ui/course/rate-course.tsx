import { rateCourse } from "@/app/lib/actions";
import styles from "./rate-course.module.css";

export default function RateCourse({ courseId }: { courseId: string }) {
  return (
    <>
      <div className={styles.container}>
        <form action={rateCourse}>
          <input type="number" name="rating" min={0} max={10} />
          <input type="hidden" name="courseId" value={courseId} />
          <button className={styles.submitRating} type="submit">
            Submit Rating
          </button>
        </form>
      </div>
    </>
  );
}
