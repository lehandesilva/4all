import { NextFunction, Request, Response } from "express";
import {
  insertNewReview,
  queryAllCoursesService,
  queryAllSectionsOfACourse,
  queryCourseDetails,
  queryCourseReviews,
  querySectionById,
} from "../services/courses";

export async function getRecommendedCourses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // recommendation system logic for later but for now just all courses.
    const result = await queryAllCoursesService();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function reviewCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    const userName = req.user?.name;
    const courseId = req.params.courseId;
    const review = req.body.review;

    await insertNewReview(courseId, userId!, userName!, review);

    return res.status(201).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSectionById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sectionId = req.params.sectionId;

    const result = await querySectionById(sectionId);

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllSectionsOfCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const courseId = req.params.courseId;

    const result = await queryAllSectionsOfACourse(courseId);

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getCourseDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const courseId = req.params.courseId;

    const result = await queryCourseDetails(courseId);

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getCourseReviews(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const courseId = req.params.courseId;

    const result = await queryCourseReviews(courseId);

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
