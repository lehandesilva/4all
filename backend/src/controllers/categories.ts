import { NextFunction, Request, Response } from "express";
import { queryCategories } from "../services/categories";

export async function getCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await queryCategories();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
