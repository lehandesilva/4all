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
exports.queryCoursesFromInstructorById = queryCoursesFromInstructorById;
exports.queryCourseInstructorFromCourseId = queryCourseInstructorFromCourseId;
exports.deleteCourseService = deleteCourseService;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
function queryCoursesFromInstructorById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db
            .select({
            id: schema_1.coursesTable.id,
            name: schema_1.coursesTable.name,
            public: schema_1.coursesTable.public,
            rating: schema_1.coursesTable.rating,
            img_url: schema_1.coursesTable.img_url,
            category_id: schema_1.coursesTable.category_id,
        })
            .from(schema_1.coursesTable)
            .where((0, drizzle_orm_1.eq)(schema_1.coursesTable.instructor_id, userId));
        return result;
    });
}
function queryCourseInstructorFromCourseId(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = db_1.db
            .select({ instructor_id: schema_1.coursesTable.instructor_id })
            .from(schema_1.coursesTable)
            .where((0, drizzle_orm_1.eq)(schema_1.coursesTable.id, courseId));
        return result;
    });
}
function deleteCourseService(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.delete(schema_1.reviewsTable).where((0, drizzle_orm_1.eq)(schema_1.reviewsTable.course_id, courseId));
        yield db_1.db.delete(schema_1.coursesTable).where((0, drizzle_orm_1.eq)(schema_1.coursesTable.id, courseId));
    });
}
