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
exports.getCoursesFromInstructorById = getCoursesFromInstructorById;
exports.deleteCourseById = deleteCourseById;
const users_1 = require("../services/users");
function getCoursesFromInstructorById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { userid } = req.params;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) !== userid) {
            return res.status(403).json({ message: "Forbidden" });
        }
        try {
            const result = yield (0, users_1.queryCoursesFromInstructorById)(userid);
            res.status(200).json(result);
        }
        catch (error) {
            console.error("Error fetching courses:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function deleteCourseById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { courseId } = req.params;
        try {
            const result = yield (0, users_1.queryCourseInstructorFromCourseId)(courseId);
            if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) !== result[0].instructor_id) {
                res.status(403).json({ message: "Forbidden" });
            }
            yield (0, users_1.deleteCourseService)(courseId);
            return res.status(204).send(); // No content response
        }
        catch (error) {
            console.error("Error deleting course:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
