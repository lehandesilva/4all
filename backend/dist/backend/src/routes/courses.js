"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courses_1 = require("../controllers/courses");
const router = (0, express_1.Router)();
router.get("/", courses_1.getRecommendedCourses);
exports.default = router;
