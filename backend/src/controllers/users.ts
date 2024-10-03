import { NextFunction, Request, Response } from "express";
import {
  deleteCourseService,
  queryCourseInstructorFromCourseId,
  queryCoursesFromInstructorById,
} from "../services/users";

export async function getCoursesFromInstructorById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userid } = req.params;
  if (req.user?.id !== userid) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const result = await queryCoursesFromInstructorById(userid);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteCourseById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { courseId } = req.params;
  try {
    const result = await queryCourseInstructorFromCourseId(courseId);

    if (req.user?.id !== result[0].instructor_id) {
      res.status(403).json({ message: "Forbidden" });
    }

    await deleteCourseService(courseId);

    return res.status(204).send(); // No content response
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
