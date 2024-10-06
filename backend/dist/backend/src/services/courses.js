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
exports.queryAllCoursesService = queryAllCoursesService;
exports.getCourseInstructorById = getCourseInstructorById;
exports.insertNewReview = insertNewReview;
exports.queryAllSectionsOfACourse = queryAllSectionsOfACourse;
exports.querySectionById = querySectionById;
exports.queryCourseDetails = queryCourseDetails;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
function queryAllCoursesService() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db
            .select({
            id: schema_1.coursesTable.id,
            name: schema_1.coursesTable.name,
            instructor_name: schema_1.coursesTable.instructor_name,
            rating: schema_1.coursesTable.rating,
            img_url: schema_1.coursesTable.img_url,
        })
            .from(schema_1.coursesTable)
            .where((0, drizzle_orm_1.eq)(schema_1.coursesTable.public, true));
        return result;
    });
}
function getCourseInstructorById(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db
            .select({
            courseId: schema_1.coursesTable.id,
            instructorId: schema_1.coursesTable.instructor_id,
        })
            .from(schema_1.coursesTable)
            .where((0, drizzle_orm_1.eq)(schema_1.coursesTable.id, courseId));
        return result[0];
    });
}
function insertNewReview(courseId, userId, userName, review) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.insert(schema_1.reviewsTable).values({
            course_id: courseId,
            user_id: userId,
            user_name: userName,
            comment: review,
        });
    });
}
function queryAllSectionsOfACourse(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sectionResults = yield db_1.db
            .select({ sections: schema_1.coursesTable.sections })
            .from(schema_1.coursesTable)
            .where((0, drizzle_orm_1.eq)(schema_1.coursesTable.id, courseId));
        return sectionResults[0];
    });
}
function querySectionById(sectionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db
            .select()
            .from(schema_1.sectionsTable)
            .where((0, drizzle_orm_1.eq)(schema_1.sectionsTable.id, sectionId));
        return result[0];
    });
}
function queryCourseDetails(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db
            .select()
            .from(schema_1.coursesTable)
            .where((0, drizzle_orm_1.eq)(schema_1.coursesTable.id, courseId));
        return result[0];
    });
}
