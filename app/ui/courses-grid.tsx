import Link from "next/link";
import classes from "./courses-grid.module.css";
import Image from "next/image";

export default function CoursesGrid({
  heading,
  data,
}: {
  heading: string;
  data: {
    id: string;
    name: string;
    instructor_name: string;
    rating: string;
    img_url: string;
  }[];
}) {
  if (data.length === 0) {
    return (
      <>
        <div className={classes.noData}>
          <p>No Courses to display</p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className={classes.sectionHeading}>
        <h2 className={classes.heading}>{heading}</h2>
      </div>
      <div className={classes.outerContainer}>
        {/* {data.map((course) => (
          <div className={classes.courseContainer} key={course.id}>
            <Link href={`/course/${course.id}`} className={classes.links}>
              <div className={classes.imgContainer}>
                <Image
                  src={course.img_url}
                  alt="Course Image"
                  width={480}
                  height={270}
                />
              </div>
              <div className={classes.infoContainer}>
                <h3 className={classes.courseTitle}>{course.name}</h3>
                <p className={classes.courseCategory}>{course.rating}</p>
                <p className={classes.courseinstructor}>
                  {course.instructor_name}
                </p>
              </div>
            </Link>
          </div>
        ))} */}
      </div>
    </>
  );
}
