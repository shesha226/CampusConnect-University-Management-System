import { Router } from "express";
import * as courseController from "../controllers/course.controller";
import { deleteStudent } from "../controllers/student.controller";
import { studentIdSchema } from "../validators/student.validators";
import validate from "../middleware/validate";
import { courseIdSchema } from "../validators/course.validators";

const router = Router();

router.post("/",
    validate(courseIdSchema),
    courseController.createCourse);


router.get("/",
    validate(courseIdSchema),
    courseController.getAllCourses);

router.get("/:id",
    validate(courseIdSchema),
    courseController.getCourseById);

router.put("/:id",
    validate(courseIdSchema),
    courseController.updateCourse
);
router.delete(
  "/:id",
  validate(courseIdSchema),
  courseController.deleteCourse
);

export default router;