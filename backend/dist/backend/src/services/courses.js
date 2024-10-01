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
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
function queryAllCoursesService() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db.select().from(schema_1.coursesTable);
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
