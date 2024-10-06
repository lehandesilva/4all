import { Router } from "express";
import {
  createNewCourse,
  createNewSection,
  deleteCourseById,
  getCoursesFromInstructorById,
  makeCoursePrivate,
  makeCoursePublic,
  updateCourseDetails,
  updateSection,
} from "../controllers/users";
import { verifyToken } from "../middleware/jwt-auth";

const router = Router();

// New course
router.post("/newCourse", verifyToken, createNewCourse);

// New Section
router.post("/newSection/:courseId", verifyToken, createNewSection);

// Update existing section
router.put("/updateSection/:courseId/:sectionId", verifyToken, updateSection);

router.put("/updateCourse/public/:courseId", verifyToken, makeCoursePublic);

router.put("/updateCourse/private/:courseId", verifyToken, makeCoursePrivate);

router.put("/updateCourse/:courseId", verifyToken, updateCourseDetails);

router.get("/:userid/courses", verifyToken, getCoursesFromInstructorById);

router.delete("/:courseId", verifyToken, deleteCourseById);

export default router;
