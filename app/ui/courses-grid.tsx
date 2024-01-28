import classes from "./courses-grid.module.css";
import Image from "next/image";
import coursePic from "@/public/vladimir-putin-proved-he-was-the-most-badass-president-in-world-history-652x400-1-1466779495.jpg";
import { Course } from "../lib/definitions";

export default function CoursesGrid({
  heading,
  data,
}: {
  heading: string;
  data: Course[];
}) {
  return (
    <>
      <div className={classes.sectionHeading}>
        <h2 className={classes.heading}>{heading}</h2>
      </div>
      <div className={classes.outerContainer}>
        {data?.map((course) => (
          <div className={classes.courseContainer} key={course.id}>
            <div className={classes.imgContainer}>
              <Image src={coursePic} alt="Course Image" width={200} />
            </div>
            <div className={classes.infoContainer}>
              <h3 className={classes.courseTitle}>{course.name}</h3>
              <p className={classes.courseCategory}>{course.rating}</p>
              <p className={classes.courseinstructor}>
                {course.instructor_name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
