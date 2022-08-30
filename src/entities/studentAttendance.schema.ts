import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type StudentAttendanceDocument = StudentAttendance & Document;

@Schema()
export class StudentAttendance {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  id: string;

  @Prop()
  studentName: string;

  @Prop({ default: false })
  attendance: boolean;

  @Prop()
  evaluation: number;

  //   @Prop()
  //   file: unknown;
}

export const StudentSchema = SchemaFactory.createForClass(StudentAttendance);
