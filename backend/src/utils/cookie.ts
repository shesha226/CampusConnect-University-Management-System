import type { Response, CookieOptions } from "express";
import { env } from "../config/environment";

export const AUTH_COOKIE_NAME = "campusconnect_token";

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60 * 1000,
};

export const setAuthCookie = (
    res: Response,
    token: string
): void => {
    res.cookie(AUTH_COOKIE_NAME, token, cookieOptions);
};

export const clearAuthCookie = (res: Response): void => {
    res.clearCookie(AUTH_COOKIE_NAME, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
};