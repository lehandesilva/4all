// Put Breadcrumbs
// loop through all blocks
// Use map and loop through all blocks and use if statements
// if check if text or title and adjust size
import { CourseMaterial, block } from "@/app/lib/definitions";
import styles from "./course-details.module.css";
import { fetchCourseMaterialById } from "@/app/lib/data";
import { resourceUsage } from "process";

// {
//   id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
//   course_id: courses[0].id,
//   blocks: [
//     {
//       type: "title",
//       content: "What the deepstate is made off",
//       size: 3,
//     },
//     {
//       type: "text",
//       content:
//         "What do all of the three letter agencies and the vatican city have in common? They're all a part of the deepstate. :O",
//       size: 1,
//     },
//   ],
// },

export default function CourseContent({
  content,
}: {
  content: CourseMaterial;
}) {
  if (!content.blocks) {
    return <div>No content to display</div>;
  }
  return (
    <>
      <div className={styles.content}>
        {content.blocks.map((block) => console.log(block.type))}
      </div>
    </>
  );
}
