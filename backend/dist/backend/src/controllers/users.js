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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesFromInstructorById = getCoursesFromInstructorById;
exports.deleteCourseById = deleteCourseById;
exports.createNewCourse = createNewCourse;
exports.createNewSection = createNewSection;
exports.updateSection = updateSection;
exports.updateCourseDetails = updateCourseDetails;
exports.makeCoursePrivate = makeCoursePrivate;
exports.makeCoursePublic = makeCoursePublic;
const users_1 = require("../services/users");
const redis_1 = __importDefault(require("../redis/redis"));
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
            yield redis_1.default.del("courses");
            return res.status(204).send(); // No content response
        }
        catch (error) {
            console.error("Error deleting course:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function createNewCourse(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { name, description, url, category } = req.body;
            const result = yield (0, users_1.insertNewCourse)(name, description, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, (_b = req.user) === null || _b === void 0 ? void 0 : _b.name, url, category);
            yield redis_1.default.del("courses");
            return res.status(200).json({ result });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function createNewSection(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const sectionName = req.body.sectionName;
            const blocks = req.body.blocks;
            const courseId = req.params.courseId;
            const newSectionId = yield (0, users_1.insertNewSectionIntoSectionTable)(userId, sectionName, blocks);
            const sections = yield (0, users_1.querySectionsOfCourse)(courseId);
            const newSectionList = sections !== null
                ? [...sections, { id: newSectionId, name: sectionName }]
                : [{ id: newSectionId, name: sectionName }];
            yield (0, users_1.insertSectionIntoCourseTable)(newSectionList, courseId);
            return res.status(201).json({ sectionId: newSectionId });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function updateSection(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sectionName = req.body.sectionName;
            const blocks = req.body.blocks;
            const courseId = req.params.courseId;
            const sectionId = req.params.sectionId;
            yield (0, users_1.updateSectionInSectionsTable)(sectionName, blocks, sectionId);
            const sections = yield (0, users_1.querySectionsOfCourse)(courseId);
            const newSectionList = sections === null || sections === void 0 ? void 0 : sections.map((section) => {
                if (section.id === sectionId) {
                    section.name = sectionName;
                }
                return section;
            });
            yield (0, users_1.insertSectionIntoCourseTable)(newSectionList ? newSectionList : null, courseId);
            return res.status(200).json({ sectionId: sectionId });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function updateCourseDetails(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseId = req.params.courseId;
            const name = req.body.name;
            const description = req.body.description;
            const url = req.body.url;
            yield (0, users_1.updateCourseTable)(name, description, url, courseId);
            yield redis_1.default.del("courses");
            return res.status(200).json({ courseId: courseId });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function makeCoursePrivate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseId = req.params.courseId;
            yield (0, users_1.updateCoursePrivate)(courseId);
            yield redis_1.default.del("courses");
            return res.status(200);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function makeCoursePublic(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseId = req.params.courseId;
            yield (0, users_1.updateCoursePublic)(courseId);
            yield redis_1.default.del("courses");
            return res.status(200);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
