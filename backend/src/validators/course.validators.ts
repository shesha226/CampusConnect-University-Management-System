
import { z } from "zod";

export const createCourseSchema = z.object({
  body: z.object({
    courseCode: z.string().trim().min(3).max(20).toUpperCase(),

    courseName: z.string().trim().min(3).max(100),

    description: z.string().trim().max(500).optional(),

    credits: z.number().int().min(1).max(10),

    department: z.string().trim().min(2).max(100),

    duration: z.number().int().min(1).max(60),
  }),
});

export const updateCourseSchema = z.object({
  body: z.object({
    courseCode: z.string().trim().min(3).max(20).toUpperCase().optional(),

    courseName: z.string().trim().min(3).max(100).optional(),

    description: z.string().trim().max(500).optional(),

    credits: z.number().int().min(1).max(10).optional(),

    department: z.string().trim().min(2).max(100).optional(),

    duration: z.number().int().min(1).max(60).optional(),

    isActive: z.boolean().optional(),
  }).strict().refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field is required" }
  ),
});

export const courseIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid course ID"),
  }),
});
