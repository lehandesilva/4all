"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courses_1 = require("../controllers/courses");
const jwt_auth_1 = require("../middleware/jwt-auth");
const router = (0, express_1.Router)();
router.get("/", courses_1.getRecommendedCourses);
router.get("/:courseId", jwt_auth_1.verifyToken, courses_1.getCourseDetails);
router.get("/:courseId/sections", jwt_auth_1.verifyToken, courses_1.getAllSectionsOfCourse);
router.get("/:courseId/:sectionId", jwt_auth_1.verifyToken, courses_1.getSectionById);
router.post("/newReview/:courseId", jwt_auth_1.verifyToken, courses_1.reviewCourse);
exports.default = router;
