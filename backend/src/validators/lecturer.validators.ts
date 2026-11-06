
import { z } from "zod";

export const createLecturerSchema = z.object({
  body: z.object({
    lecturerId: z.string().trim().min(3).max(20),

    firstName: z.string().trim().min(2).max(50),

    lastName: z.string().trim().min(2).max(50),

    email: z.string().trim().email().toLowerCase(),

    phone: z.string().trim().optional(),

    department: z.string().trim().min(2).max(100),

    specialization: z.string().trim().max(100).optional(),
  }),
});

export const updateLecturerSchema = z.object({
  body: z.object({
    lecturerId: z.string().trim().min(3).max(20).optional(),

    firstName: z.string().trim().min(2).max(50).optional(),

    lastName: z.string().trim().min(2).max(50).optional(),

    email: z.string().trim().email().toLowerCase().optional(),

    phone: z.string().trim().optional(),

    department: z.string().trim().min(2).max(100).optional(),

    specialization: z.string().trim().max(100).optional(),

    isActive: z.boolean().optional(),
  }).strict().refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field is required" }
  ),
});

export const lecturerIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid lecturer ID"),
  }),
});
