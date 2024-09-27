import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { checkEmailExists, createUser, getUserInfo } from "../services/auth";
import jwt from "jsonwebtoken";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Failed");
      throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const age = req.body.age;
    const password = req.body.password;
    const email_exists = await checkEmailExists(email);
    if (email_exists && email_exists.length > 0) {
      res.status(409).json({ message: "User already exists" });
    } else {
      const hashedPw = await bcrypt.hash(password, 12);
      const result = await createUser(name, email, hashedPw, age);
      res.status(201).json({
        message: "User created successfully",
        userId: result[0].userId,
      });
    }
  } catch (error) {}
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await getUserInfo(email);
    console.log(user);
    if (!user) {
      res.status(401).json({ message: "No account under this email" });
    } else {
      const result = await bcrypt.compare(password, user[0].password);
      console.log(result);
      if (!result) {
        res.status(401).json({ message: "Wrong password" });
      } else {
        const token = jwt.sign(
          { id: user[0].id, email: user[0].email, role: user[0].role },
          process.env.PRIVATE_KEY as string,
          { expiresIn: "1h" }
        );
        res.status(200).json({ token: token, userId: user[0].id });
      }
    }
  } catch (error) {}
}
