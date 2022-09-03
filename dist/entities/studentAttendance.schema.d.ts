import mongoose, { Document } from 'mongoose';
export declare type StudentAttendanceDocument = StudentAttendance & Document;
export declare class StudentAttendance {
    id: string;
    studentName: string;
    attendance: boolean;
    evaluation: number;
}
export declare const StudentSchema: mongoose.Schema<StudentAttendance, mongoose.Model<StudentAttendance, any, any, any, any>, {}, {}, any, {}, "type", StudentAttendance>;
