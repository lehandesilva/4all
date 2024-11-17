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
exports.signUp = signUp;
exports.login = login;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../services/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                const error = new Error("Validation Failed");
                throw error;
            }
            const email = req.body.email;
            const name = req.body.name;
            const age = req.body.age;
            const password = req.body.password;
            console.log("called");
            const email_exists = yield (0, auth_1.checkEmailExists)(email);
            console.log("called");
            if (email_exists && email_exists.length > 0) {
                return res.status(409).json({ message: "User already exists" });
            }
            else {
                const hashedPw = yield bcryptjs_1.default.hash(password, 12);
                const result = yield (0, auth_1.createUser)(name, email, hashedPw, age);
                return res.status(201).json({
                    message: "User was created successfully ",
                    userId: result[0].userId,
                });
            }
        }
        catch (error) { }
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = yield (0, auth_1.getUserInfo)(email);
            console.log(user);
            if (!user) {
                return res.status(401).json({ message: "No account under this email" });
            }
            else {
                const result = yield bcryptjs_1.default.compare(password, user.password);
                console.log(result);
                if (!result) {
                    return res.status(401).json({ message: "Wrong password" });
                }
                else {
                    const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.PRIVATE_KEY, { expiresIn: "1h" });
                    // Respond with token
                    return res.status(200).json({ token });
                }
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
