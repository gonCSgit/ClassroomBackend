import mongoose, { Document, ObjectId } from 'mongoose';
export declare type ClassDocument = Class & Document;
export declare class Class {
    name: string;
    summary: string;
    date: string;
    duration: number;
    studentAttendance: [];
    teacher: ObjectId;
}
export declare const ClassSchema: mongoose.Schema<Class, mongoose.Model<Class, any, any, any, any>, {}, {}, any, {}, "type", Class>;
