
import { Router } from "express";

import {
  createLecturer,
  getAllLecturers,
  getLecturerById,
  updateLecturer,
  deleteLecturer,
} from "../controllers/lecturer.controller";

import validate from "../middleware/validate";

import {
  createLecturerSchema,
  updateLecturerSchema,
  lecturerIdSchema,
} from "../validators/lecturer.validators";

const router = Router();

router.post(
  "/",
  validate(createLecturerSchema),
  createLecturer
);

router.get("/", getAllLecturers);

router.get(
  "/:id",
  validate(lecturerIdSchema),
  getLecturerById
);

router.patch(
  "/:id",
  validate(lecturerIdSchema),
  validate(updateLecturerSchema),
  updateLecturer
);

router.delete(
  "/:id",
  validate(lecturerIdSchema),
  deleteLecturer
);

export default router;
