import { NextFunction, Request, Response } from "express";

export async function authCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(200).json({ authenticated: true, user: req.user });
}
