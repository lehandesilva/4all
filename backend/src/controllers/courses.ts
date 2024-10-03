import { NextFunction, Request, Response } from "express";
import { queryAllCoursesService } from "../services/courses";

export async function getRecommendedCourses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // recommendation system logic for later but for now just all courses.
    const result = await queryAllCoursesService();
    res.status(200).json(result);
  } catch (error) {
    return error;
  }
}
