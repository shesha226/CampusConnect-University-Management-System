import bcrypt from "bcryptjs";
import User from "../models/User";
import { findUserByEmail, createUser } from "../repositories/user.repository";
import AppError from "../utils/AppError";


export const register = async (userData: {
    username: string;
    email: string;
    password: string;
    role: string;
}) => {
    const  exsistingUser = await findUserByEmail(userData.email);
    if (exsistingUser) {
        throw new AppError("User with this email already exists", 400);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newuser = await createUser({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: userData.role
    });
    return newuser;
    
    }