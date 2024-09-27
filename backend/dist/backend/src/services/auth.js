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
exports.createUser = createUser;
exports.checkEmailExists = checkEmailExists;
exports.getUserInfo = getUserInfo;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
function createUser(name, email, password, age) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db
            .insert(schema_1.users)
            .values({
            name: name,
            email: email,
            password: password,
            age: age,
            role: "user",
        })
            .returning({ userId: schema_1.users.id });
        return result;
    });
}
function checkEmailExists(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db
            .select({ email: schema_1.users.email })
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.email, email));
        return result;
    });
}
function getUserInfo(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db
            .select({
            id: schema_1.users.id,
            email: schema_1.users.email,
            password: schema_1.users.password,
            role: schema_1.users.role,
        })
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.email, email));
        return result;
    });
}
