import type { Request, Response, NextFunction } from "express";

import { verifyAccessToken } from "../utils/jwt";
import { AUTH_COOKIE_NAME } from "../utils/cookie";
import AppError from "../utils/AppError";

export interface AuthPayload {
    sub: string;
    role: "student" | "teacher" | "admin";
}

export function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const token = req.cookies?.[AUTH_COOKIE_NAME];

    if (!token) {
        return next(
            new AppError("Authentication required", 401)
        );
    }

    try {
        const decoded = verifyAccessToken(token);

        res.locals.auth = decoded;

        next();

    } catch {
        next(
            new AppError("Invalid or expired session", 401)
        );
    }
}

export function allowRoles(
    ...roles: AuthPayload["role"][]
) {
    return (
        _req: Request,
        res: Response,
        next: NextFunction
    ): void => {

        const auth = res.locals.auth as AuthPayload | undefined;

        if (!auth) {
            return next(
                new AppError("Authentication required", 401)
            );
        }

        if (!roles.includes(auth.role)) {
            return next(
                new AppError(
                    "You do not have permission to perform this action",
                    403
                )
            );
        }

        next();
    };
}