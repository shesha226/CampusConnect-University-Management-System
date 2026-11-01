import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import AppError from "../utils/AppError";

const validate = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(new AppError(JSON.stringify(errors), 400));
    }

    res.locals.validated = result.data;
    next();
  };
};

export default validate;