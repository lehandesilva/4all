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
exports.checkCourseOwnership = checkCourseOwnership;
const courses_1 = require("../services/courses");
function checkCourseOwnership(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const courseId = req.params.courseId;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Extract userId from the verified token
        try {
            const course = yield (0, courses_1.getCourseInstructorById)(courseId);
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }
            if (course.instructorId !== userId) {
                return res
                    .status(403)
                    .json({ message: "You are not authorized to edit this course" });
            }
            next(); // Proceed if ownership check passes
        }
        catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    });
}
