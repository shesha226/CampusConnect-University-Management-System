
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthPayload {
  sub: string;
  role: "Admin" | "Lecturer" | "Student";
}

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.campusconnect_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret || secret.length < 32) {
      throw new Error("JWT secret is not configured");
    }

    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded === "string" ||
      typeof decoded.sub !== "string" ||
      !["Admin", "Lecturer", "Student"].includes(
        String(decoded.role)
      )
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }

    res.locals.auth = decoded as AuthPayload;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired session",
    });
  }
}

export function allowRoles(
  ...roles: AuthPayload["role"][]
) {
  return (_req: Request, res: Response, next: NextFunction) => {
    const auth = res.locals.auth as AuthPayload | undefined;

    if (!auth) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!roles.includes(auth.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
}
