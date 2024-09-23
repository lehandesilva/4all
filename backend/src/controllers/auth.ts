import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Failed");
      throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const hashedPw = bcrypt.hash(password, 12);
  } catch (error) {}
}
