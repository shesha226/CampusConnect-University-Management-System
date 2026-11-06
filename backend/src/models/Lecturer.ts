import mongoose, { Schema, Document } from 'mongoose';

export interface ILecturer extends Document {
    lecturerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  specialization?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LecturerSchema = new Schema<ILecturer>(
    {
        lecturerId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please provide a valid email address',
            ],
        },
        phone: {
            type: String,
            trim: true,
        },
        department: {
            type: String,
            required: true,
            trim: true,
        },
        specialization: {
            type: String,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Lecturer = mongoose.model<ILecturer>('Lecturer', LecturerSchema);

export default Lecturer;
            