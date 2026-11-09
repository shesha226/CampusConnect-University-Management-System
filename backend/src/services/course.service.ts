
import * as courseRepository from "../repositories/course.repository";
import  AppError  from "../utils/AppError";

export const createCourseService = async (data: any) => {
  const existingCourses = await courseRepository.findAllCourses();

  const courseExists = existingCourses.some(
    (course) => course.courseCode === data.courseCode
  );

  if (courseExists) {
    throw new AppError("Course code already exists", 409);
  }

  return courseRepository.createCourse(data);
};

export const getAllCoursesService = async () => {
  return courseRepository.findAllCourses();
};

// Get course by ID
export const getCourseByIdService = async (id: string) => {
  const course = await courseRepository.findCourseById(id);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  return course;
};

export const updateCourseService = async (
  id: string,
  data: any
) => {
  const course = await courseRepository.findCourseById(id);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  return courseRepository.updateCourse(id, data);
};

// Delete course
export const deleteCourseService = async (id: string) => {
  const course = await courseRepository.findCourseById(id);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  await courseRepository.deleteCourse(id);
};
