"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const jwt_auth_1 = require("../middleware/jwt-auth");
const router = (0, express_1.Router)();
router.get("/:userid/courses", jwt_auth_1.verifyToken, users_1.getCoursesFromInstructorById);
router.delete("/:courseId", jwt_auth_1.verifyToken, users_1.deleteCourseById);
exports.default = router;
