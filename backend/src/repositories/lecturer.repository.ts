import Lecturer from "../models/Lecturer";
import type { ILecturer } from "../models/Lecturer";


export const createLecturer = async (
    data: Partial<ILecturer>
) => {
    return Lecturer.create(data);
};


export const findAllLecturers = async () => {
    return Lecturer.find().sort({ createdAt: -1 });
}

export const findLecturerById = async (id: string) => {
    return Lecturer.findById(id);
}

export const findLecturerByEmail = async (email: string) => {
    return Lecturer.findOne({ email });
};

export const updateLecturer = async (
    id: string,
    data: Partial<ILecturer>
) => {
    return Lecturer.findByIdAndUpdate(id, data, { new: true });
};

export const deleteLecturer = async (id: string) => {
    return Lecturer.findByIdAndDelete(id);
}

