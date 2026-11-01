import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { env } from "../config/environment";

const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = "Internal server error";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  if (env.NODE_ENV !== "production" && !(error instanceof AppError)) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.NODE_ENV === "development" && {
      stack: error instanceof Error ? error.stack : undefined,
    }),
  });
};

export default errorHandler;