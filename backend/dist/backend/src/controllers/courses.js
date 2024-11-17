"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendedCourses = getRecommendedCourses;
exports.reviewCourse = reviewCourse;
exports.getSectionById = getSectionById;
exports.getAllSectionsOfCourse = getAllSectionsOfCourse;
exports.getCourseDetails = getCourseDetails;
exports.getCourseReviews = getCourseReviews;
const courses_1 = require("../services/courses");
function getRecommendedCourses(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // recommendation system logic for later but for now just all courses.
            const result = yield (0, courses_1.queryAllCoursesService)();
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function reviewCourse(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const userName = (_b = req.user) === null || _b === void 0 ? void 0 : _b.name;
            const courseId = req.params.courseId;
            const review = req.body.review;
            yield (0, courses_1.insertNewReview)(courseId, userId, userName, review);
            return res.status(201).json({ message: "success" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function getSectionById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sectionId = req.params.sectionId;
            const result = yield (0, courses_1.querySectionById)(sectionId);
            return res.status(200).json({ result });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function getAllSectionsOfCourse(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseId = req.params.courseId;
            const result = yield (0, courses_1.queryAllSectionsOfACourse)(courseId);
            return res.status(200).json({ result });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function getCourseDetails(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseId = req.params.courseId;
            const result = yield (0, courses_1.queryCourseDetails)(courseId);
            return res.status(200).json({ result });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function getCourseReviews(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseId = req.params.courseId;
            const result = yield (0, courses_1.queryCourseReviews)(courseId);
            return res.status(200).json({ result });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
