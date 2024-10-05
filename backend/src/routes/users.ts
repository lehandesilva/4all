import { Router } from "express";
import {
  createNewCourse,
  deleteCourseById,
  getCoursesFromInstructorById,
} from "../controllers/users";
import { verifyToken } from "../middleware/jwt-auth";

const router = Router();

router.post("/newCourse", verifyToken, createNewCourse);

router.get("/:userid/courses", verifyToken, getCoursesFromInstructorById);

router.delete("/:courseId", verifyToken, deleteCourseById);

export default router;
