import * as studentRepository from "../repositories/student.repository";
import { deleteStudentById } from "../repositories/student.repository";
import AppError from "../utils/AppError";


export const createStudent = async (data: any) => {
    const existingStudent = await studentRepository.findStudentById(data.id);

    if (existingStudent) {
        throw new AppError("Student with this ID already exists", 409);
    }

    return studentRepository.createStudent(data);
};

export const getAllStudents = async () => {
    return studentRepository.findAllStudents();
};

export const getStudentById = async (id: string) => {
    const student = await studentRepository.findStudentById(id);

    if (!student) {
        throw new AppError("Student not found", 404);
    }

    return student;
};

export const updateStudentById = async (id: string, data: any) => {
    const student = await studentRepository.findStudentById(id);

    if (!student) {
        throw new AppError("Student not found", 404);
    }
    const existingStudentWithEmail = await studentRepository.findAllStudents();
    if (existingStudentWithEmail.some((s) => s.email === data.email && s._id.toString() !== id)) {
        throw new AppError("Another student with this email already exists", 409);
    }

    return studentRepository.updateStudentById(id, data);
};

export const deleteStudentsById = async (id: string) => {
    const student = await studentRepository.findStudentById(id);

    if (!student) {
        throw new AppError("Student not found", 404);
    }

    return studentRepository.deleteStudentById(id);
};