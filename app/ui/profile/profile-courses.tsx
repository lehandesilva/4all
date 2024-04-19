import styles from "./profile-courses.module.css";
import Link from "next/link";
import ProfileCourse from "./profile-course";
import DeleteCourseBtn from "./delete-course-btn";

interface UserCoursesProps {
  courses: { id: string; name: string; rating: number; img_url: string }[]; // Array of course objects
}
interface courseProps {
  id: string;
  name: string;
  rating: number;
  img_url: string;
}

export default function ProfileCourses({ userCourses }: UserCoursesProps) {
  return (
    <>
      {userCourses.map((course: courseProps) => (
        <div className={styles.course} key={course.id}>
          <Link href={`/course/${course.id}`}>
            <ProfileCourse course={course} />
          </Link>
          <DeleteCourseBtn courseId={course.id} />
        </div>
      ))}
    </>
  );
}
