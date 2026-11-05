
import User, { type UserType } from "../models/User";

// Find user by email without password
export const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

// Find user by email including password (Login only)
export const findUserByEmailWithPassword = async (email: string) => {
  return User.findOne({ email }).select("+password");
};

// Find user by ID
export const findUserById = async (id: string) => {
  return User.findById(id);
};

// Create a new user
export const createUser = async (
  userData: Pick<UserType, "username" | "email" | "password" | "role">
) => {
  return User.create(userData);
};
