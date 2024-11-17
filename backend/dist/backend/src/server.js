"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const courses_1 = __importDefault(require("./routes/courses"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const categories_1 = __importDefault(require("./routes/categories"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.NEXT_PUBLIC_FRONTEND_ORIGIN, // Next.js frontend origin
    credentials: true, // Allow credentials (cookies) to be sent
}));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/course", courses_1.default);
app.use("/auth", auth_1.default);
app.use("/users", users_1.default);
app.use("/categories", categories_1.default);
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
