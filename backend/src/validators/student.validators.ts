
import { z } from "zod";

export const createStudentSchema = z.object({
  body: z.object({
    studentId: z.string().trim().min(3).max(20),

    firstName: z.string().trim().min(2).max(50),

    lastName: z.string().trim().min(2).max(50),

    email: z.string().trim().email().toLowerCase(),

    phone: z.string().trim().optional(),

    address: z.string().trim().optional(),

    dateOfBirth: z.coerce.date().optional(),
  }),
});

export const updateStudentSchema = z.object({
  body: z.object({
    studentId: z.string().trim().min(3).max(20).optional(),

    firstName: z.string().trim().min(2).max(50).optional(),

    lastName: z.string().trim().min(2).max(50).optional(),

    email: z.string().trim().email().toLowerCase().optional(),

    phone: z.string().trim().optional(),

    address: z.string().trim().optional(),

    dateOfBirth: z.coerce.date().optional(),

    isActive: z.boolean().optional(),
  }).strict().refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field is required" }
  ),
});

export const studentIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid student ID"),
  }),
});
