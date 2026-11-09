
import Course from "../models/Course";
import type { CourseType } from "../models/Course";

export const createCourse = async (
  data: Partial<CourseType>
) => {
  return Course.create(data);
};

export const findAllCourses = async () => {
  return Course.find().sort({ createdAt: -1 });
};

export const findCourseById = async (id: string) => {
  return Course.findById(id);
};

export const updateCourse = async (
  id: string,
  data: Partial<CourseType>
) => {
  return Course.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete course
export const deleteCourse = async (id: string) => {
  return Course.findByIdAndDelete(id);
};
