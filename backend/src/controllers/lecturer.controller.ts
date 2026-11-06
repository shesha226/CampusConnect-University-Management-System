import { Request, Response, NextFunction } from 'express';
import * as lecturerService from '../services/lecturer.service';


export const createLecturer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lecturer = await lecturerService.createLecturer(req.body);

        res.status(201).json({
            success: true,
            message: "Lecturer created successfully",
            data: lecturer,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllLecturers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lecturers = await lecturerService.getAllLecturers();

        res.status(200).json({
            success: true,
            data: lecturers,
        });
    } catch (error) {
        next(error);
    }
};

export const getLecturerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lecturer = await lecturerService.getLecturerById( req.params.id as string);

        res.status(200).json({
            success: true,
            data: lecturer,
        });
    } catch (error) {
        next(error);
    }
};

export const updateLecturer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lecturer = await lecturerService.updateLecturer(req.params.id as string, req.body);

        res.status(200).json({
            success: true,
            message: "Lecturer updated successfully",
            data: lecturer,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteLecturer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await lecturerService.deleteLecturer(req.params.id as string);

        res.status(200).json({
            success: true,
            message: "Lecturer deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};  