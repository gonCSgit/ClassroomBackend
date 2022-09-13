import mongoose from 'mongoose';
import { CreateAttendanceDto } from './create-attendance.dto';

export class ClassDto {
  name: string;

  summary: string;

  date: DateConstructor;

  duration: 0 | 30 | 60 | 90 | 120 | 150 | 180 | 210 | 240 | 270 | 300;

  classAttendance: CreateAttendanceDto[];

  teacherId: mongoose.ObjectId;
}
