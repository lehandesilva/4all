import { Router } from "express";
import {
  getAllSectionsOfCourse,
  getCourseDetails,
  getCourseReviews,
  getRecommendedCourses,
  getSectionById,
  reviewCourse,
} from "../controllers/courses";
import { verifyToken } from "../middleware/jwt-auth";

const router = Router();

router.get("/", getRecommendedCourses);

router.get("/reviews/:courseId", getCourseReviews);

router.get("/:courseId", verifyToken, getCourseDetails);

router.get("/:courseId/sections", verifyToken, getAllSectionsOfCourse);

router.get("/:courseId/:sectionId", verifyToken, getSectionById);

router.post("/newReview/:courseId", verifyToken, reviewCourse);

export default router;
