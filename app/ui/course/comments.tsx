// display the comments
import { timeStamp } from "console";
import styles from "./comments.module.css";

export default function CommentSection({
  comments,
}: {
  comments: { user: string; review: string; timestamp: string }[];
}) {
  return (
    <>
      <div className={styles.commentSection}>
        {comments.map((comment, index) => (
          <div className={styles.comment} key={index}>
            <div className={styles.user}>{comment.user}</div>
            <div className={styles.date}>{comment.timestamp}</div>
            <div className={styles.comment}>{comment.review}</div>
          </div>
        ))}
      </div>
    </>
  );
}
