

import { Router } from "express";

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller";

import validate from "../middleware/validate";
import {
  createStudentSchema,
  updateStudentSchema,
  studentIdSchema,
} from "../validators/student.validators";

const router = Router();

// Create student
router.post(
  "/",
  validate(createStudentSchema),
  createStudent
);

// Get all students
router.get("/", getAllStudents);

// Get student by ID
router.get(
  "/:id",
  validate(studentIdSchema),
  getStudentById
);

// Update student
router.patch(
  "/:id",
  validate(studentIdSchema),
  validate(updateStudentSchema),
  updateStudent
);

router.delete(
  "/:id",
  validate(studentIdSchema),
  deleteStudent
);

export default router;
