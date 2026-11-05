
import bcrypt from "bcryptjs";

import {
  createUser,
  findUserByEmail,
  findUserByEmailWithPassword,
  findUserById,
} from "../repositories/user.repository";

import { generateAccessToken } from "../utils/jwt";
import AppError from "../utils/AppError";

const SALT_ROUNDS = 12;

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

// Register a new user
export const registerUser = async (data: RegisterInput) => {
  const normalizedEmail = data.email.trim().toLowerCase();

  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    SALT_ROUNDS
  );

  const user = await createUser({
    username: data.username.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role: "Student",
  });

  const token = generateAccessToken({
    sub: user._id.toString(),
    role: user.role,
  });

  return {
    user: {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    },
    token,
  };
};

// Login an existing user
export const loginUser = async (data: LoginInput) => {
  const normalizedEmail = data.email.trim().toLowerCase();

  const user = await findUserByEmailWithPassword(normalizedEmail);

  if (!user || !user.isActive) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateAccessToken({
    sub: user._id.toString(),
    role: user.role,
  });

  return {
    user: {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    },
    token,
  };
};

// Get current authenticated user
export const getCurrentUser = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.isActive) {
    throw new AppError("Your account is inactive", 403);
  }

  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
