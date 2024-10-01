import { Request, Response, NextFunction } from "express";
import { getCourseInstructorById } from "../services/courses";

export async function checkCourseOwnership(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const courseId = req.params.courseId;
  const userId = req.user?.id; // Extract userId from the verified token

  try {
    const course = await getCourseInstructorById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructorId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this course" });
    }

    next(); // Proceed if ownership check passes
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
