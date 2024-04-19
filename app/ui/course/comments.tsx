// display the comments
import styles from "./comments.module.css";

export default function CommentSection({
  comments,
}: {
  comments: { user: string; review: string; timestamp: string }[];
}) {
  if (comments.length === 0) {
    return <p>Be the first to comment</p>;
  }

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
