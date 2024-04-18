// add comment functionality
// Make server action the add review and update the courses table
// takes a form
import styles from "./add-comment.module.css";
import { addCommentAction } from "@/app/lib/actions";

export default function AddComment({ courseId }: { courseId: string }) {
  return (
    <>
      <div className={styles.addComment}>
        <form action={addCommentAction}>
          <input type="hidden" name="courseId" value={courseId} />
          <input type="text" placeholder="Post comment" name="comment" />
          <button className={styles.commentBtn} type="submit">
            Add Comment
          </button>
        </form>
      </div>
    </>
  );
}
