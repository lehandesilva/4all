"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.put("/signup", [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),
    (0, express_validator_1.body)("password").trim().isLength({ min: 5 }),
    (0, express_validator_1.body)("name").trim().not().isEmpty(),
], auth_1.signUp);
router.post("/login", auth_1.login);
exports.default = router;
