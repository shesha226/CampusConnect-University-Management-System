import type { Request, Response } from "express";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import type { User as UserType } from "../models/User";

import { loginSchema, registerSchema } from "../validators/auth.validators";
const ONE_DAY = 24 * 60 * 60; // 1 day in seconds


function getJWtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length== 32) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    return secret;
}

function setAuthCookie(res: Response, token: string) {
    res.cookie("campusconnect_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: ONE_DAY * 1000, // 1 day in milliseconds
    });
}

function createToken(user: {
    _id: unknown;
    role: string;
}): string{
    return jwt.sign(
        { sub:String(user._id), role: user.role},
        getJWtSecret(),
        {expiresIn: "1d"}
    );
}

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Please check your registration details",
      errors: parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }
    try {
    const { username, email, password, role } = parsed.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
        }
        const hashedPassword = await bycrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role,
        });

        const token = createToken(newUser);
        setAuthCookie(res, token);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return res.status(409).json({
        success: false,
        message: "Unable to register with these details",
      });
        }
        
        console.error("Error during registration:");
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function login(req: Request, res: Response) {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            message: "Please check your login details",
            errors: parsed.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
    }

    try {
        const { email, password } = parsed.data;

        const user = await User.findOne({ email }).select("+password");
        if (!user || !user.isActive) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bycrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        setAuthCookie(res, createToken(user));

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


export async function logout(req: Request, res: Response) {
    res.clearCookie("campusconnect_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });
    return res.status(200).json({
        success: true,
        message: "Logout successful",
    });
}