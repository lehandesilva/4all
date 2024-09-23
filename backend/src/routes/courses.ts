import { Router } from "express";
import { getRecommendedCourses } from "../controllers/courses";

const router = Router();

router.get("/", getRecommendedCourses);

export default router;
