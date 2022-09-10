import mongoose from 'mongoose';

export class CreateAttendanceDto {
  studentId?: mongoose.ObjectId;

  attendance?: boolean;

  evaluation?: number;
}
