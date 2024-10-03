import { Router } from "express";
import { body } from "express-validator";
import { login, signUp } from "../controllers/auth";
import { verifyToken } from "../middleware/jwt-auth";
import { authCheck } from "../middleware/auth-check";

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

router.get("/check", verifyToken, authCheck);

export default router;
