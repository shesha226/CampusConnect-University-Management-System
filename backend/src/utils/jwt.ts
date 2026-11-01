import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/environment";

interface TokenPayload {
    sub: string;
    role: "student" | "teacher" | "admin";
}

const JWT_ISSUER = "campusconnect-api";
const JWT_AUDIENCE = "campusconnect-client";

export const generateAccessToken = (
    payload: TokenPayload
): string => {
    const options: SignOptions = {
        expiresIn: "15m",
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
    };

    return jwt.sign(payload, env.JWT_SECRET, options);
};

export const verifyAccessToken = (
    token: string
): TokenPayload => {
    const decoded = jwt.verify(token, env.JWT_SECRET, {
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
    });

    if (
        typeof decoded === "string" ||
        typeof decoded.sub !== "string" ||
        !["student", "teacher", "admin"].includes(decoded.role as string)
    ) {
        throw new Error("Invalid authentication token");
    }

    return {
        sub: decoded.sub,
        role: decoded.role as TokenPayload["role"],
    };
};