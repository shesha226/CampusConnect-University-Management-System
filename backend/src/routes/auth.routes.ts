
import { Router } from "express";
import {
  register,
  login,
  logout,
} from "../controllers/auth.controller";
import {
  authenticate,
  type AuthPayload,
} from "../middleware/auth";
import User from "../models/User";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", authenticate, async (_req, res) => {
  try {
    const auth = res.locals.auth as AuthPayload;

    const user = await User.findById(auth.sub)
      .select("name email role isActive");

    if (!user || !user.isActive) {
      res.clearCookie("campusconnect_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      return res.status(401).json({
        success: false,
        message: "User session is no longer active",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Could not retrieve user details",
    });
  }
});

export default router;
