import { Router } from "express";
import {
  deleteCourseById,
  getCoursesFromInstructorById,
} from "../controllers/users";
import { verifyToken } from "../middleware/jwt-auth";

const router = Router();

router.get("/:userid/courses", verifyToken, getCoursesFromInstructorById);

router.delete("/:courseId", verifyToken, deleteCourseById);

export default router;
