import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type ClassDocument = Class & Document;

class Attendance {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  studentId: ObjectId;

  @Prop({ default: false, required: true })
  attendance: boolean;

  @Prop({ enum: [...Array(21).keys()], default: 0 })
  evaluation: number;
}

@Schema()
export class Class {
  @Prop({ maxlength: 24, default: '' })
  name: string;

  @Prop({ default: '', required: true })
  summary: string;

  @Prop({ type: mongoose.SchemaTypes.Date })
  date: string;

  @Prop({
    enum: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300],
    default: 0,
  })
  duration: number;

  @Prop([
    {
      type: [Attendance],
      default: [],
    },
  ])
  studentAttendance: Attendance[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  teacherId: ObjectId;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
