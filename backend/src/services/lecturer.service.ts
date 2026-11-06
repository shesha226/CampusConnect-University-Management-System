import * as  lecturerRepository from '../repositories/lecturer.repository';
import AppError from '../utils/AppError';


export const createLecturer = async (data: any) => {
    const existingLecturer = await lecturerRepository.findLecturerByEmail(data.email);
    if (existingLecturer) {
        throw new AppError('Lecturer with this email already exists', 400);
    }

    const existingLecturerId = await lecturerRepository.findLecturerById(data.lecturerId);
    if (existingLecturerId) {
        throw new AppError('Lecturer with this ID already exists', 400);
    }

    return lecturerRepository.createLecturer(data);
};

export const getAllLecturers = async () => {
    return lecturerRepository.findAllLecturers();
};

export const getLecturerById = async (id: string) => {
    const lecturer = await lecturerRepository.findLecturerById(id);

    if (!lecturer) {
        throw new AppError('Lecturer not found', 404);
    }

    return lecturer;
};

export const updateLecturer = async (id: string, data: any) => {
    const lecturer = await lecturerRepository.findLecturerById(id);

    if (!lecturer) {
        throw new AppError('Lecturer not found', 404);
    }

    return lecturerRepository.updateLecturer(id, data);
};

export const deleteLecturer = async (id: string) => {
    const lecturer = await lecturerRepository.findLecturerById(id);

    if (!lecturer) {
        throw new AppError('Lecturer not found', 404);
    }

    return lecturerRepository.deleteLecturer(id);
};