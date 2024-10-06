"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const jwt_auth_1 = require("../middleware/jwt-auth");
const router = (0, express_1.Router)();
// New course
router.post("/newCourse", jwt_auth_1.verifyToken, users_1.createNewCourse);
// New Section
router.post("/newSection/:courseId", jwt_auth_1.verifyToken, users_1.createNewSection);
// Update existing section
router.put("/updateSection/:courseId/:sectionId", jwt_auth_1.verifyToken, users_1.updateSection);
router.put("/updateCourse/public/:courseId", jwt_auth_1.verifyToken, users_1.makeCoursePublic);
router.put("/updateCourse/private/:courseId", jwt_auth_1.verifyToken, users_1.makeCoursePrivate);
router.put("/updateCourse/:courseId", jwt_auth_1.verifyToken, users_1.updateCourseDetails);
router.get("/:userid/courses", jwt_auth_1.verifyToken, users_1.getCoursesFromInstructorById);
router.delete("/:courseId", jwt_auth_1.verifyToken, users_1.deleteCourseById);
exports.default = router;
