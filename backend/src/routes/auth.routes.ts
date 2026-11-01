import { Router } from "express";
import {
  register,
  login,
  logout,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";
import User from "../models/User";
import { clearAuthCookie } from "../utils/cookie";
import AppError from "../utils/AppError";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get(
  "/me",
  authenticate,
  asyncHandler(async (_req, res) => {
    const auth = res.locals.auth;

if (!auth) {
  throw new AppError("Authentication required", 401);
}

    const user = await User.findById(auth.sub).select(
      "username email role isActive"
    );

    if (!user || !user.isActive) {
      clearAuthCookie(res);

      throw new AppError("User session is no longer active", 401);
    }

    return res.status(200).json({
      success: true,
      message: "User details retrieved successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  })
);

export default router;