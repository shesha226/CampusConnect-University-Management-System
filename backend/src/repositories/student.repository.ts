import Student from "../models/Student";
import { type StudentType } from "../models/Student";


export const createStudent = async(
    data:Partial<StudentType>
) => Student.create(data);

export const findAllStudents = async () => {
    return Student.find().sort({ createdAt: -1 });
};

export const findStudentById = async (id: string) => {
    return Student.findById(id);
};

export const updateStudentById = async(
    id: string,
    data: Partial<StudentType>
) => {
    return Student.findByIdAndUpdate(id, data, { new: true });
};

export const deleteStudentById = async (id:string) => {
    return Student.findByIdAndDelete(id);
}