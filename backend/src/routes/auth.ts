import { Router } from "express";
import { body } from "express-validator";
import { login, signUp } from "../controllers/auth";

const router = Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  signUp
);

router.post("/login", login);

export default router;
