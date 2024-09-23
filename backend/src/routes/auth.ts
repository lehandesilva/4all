import { Router } from "express";
import { body } from "express-validator";
import { findUserByEmail } from "../services/auth";
import { signUp } from "../controllers/auth";

const router = Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (value, { req: Request }) => {
        const userDoc = await findUserByEmail(value);
        if (userDoc) {
          return Promise.reject("E-Mail address already exists!");
        }
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  signUp
);
