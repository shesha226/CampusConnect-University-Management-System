
import { Request, Response, NextFunction } from "express";
import * as studentService from "../services/student.service";

// Create student
export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await studentService.createStudent(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Get all students
export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await studentService.getAllStudents();

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// Get student by ID
export const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await studentService.getStudentById(
      req.params.id as string
    );

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Update student
export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await studentService.updateStudentById(
      req.params.id as string,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Delete student
export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await studentService.deleteStudentsById(
      req.params.id as string
    );

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
