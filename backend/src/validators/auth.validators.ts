import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["student", "teacher", "admin"]).default("student"),
});

export const loginSchema = z.object({
    email: z.string().email().trim().transform((val) => val.toLowerCase()),
    password: z.string().min(6),
});