// Put Breadcrumbs
// loop through all blocks
// Use map and loop through all blocks and use if statements
// if check if text or title and adjust size
import { CourseMaterial, block } from "@/app/lib/definitions";
import styles from "./course-content.module.css";

export default function CourseContent({
  content,
}: {
  content: CourseMaterial;
}) {
  if (!content.blocks) {
    return <div className={styles.noContents}>No content to display</div>;
  }
  return (
    <>
      <div className={styles.content}>
        {content.blocks.map((block, index) => {
          if (block.type === "text") {
            return (
              <p key={index} className={styles.texts}>
                {block.content}
              </p>
            );
          } else if (block.type === "title") {
            return (
              <h2 key={index} className={styles.titles}>
                {block.content}
              </h2>
            );
          }
        })}
      </div>
    </>
  );
}
