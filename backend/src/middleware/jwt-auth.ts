import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayloadWithUser extends jwt.JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Middleware to verify JWT from cookies
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    console.log("no token");
    return res
      .status(401)
      .json({ message: "Authentication failed, no token provided" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY as string);
    console.log("checking token");
    if (typeof decoded !== "string") {
      const payload = decoded as JwtPayloadWithUser; // Type casting to the correct interface
      req.user = payload; // Attach decoded token (user info) to the request object
    }
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.log("token invalid");
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
}
