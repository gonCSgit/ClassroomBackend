import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { ClassAttendance } from './class-attendance.schema';

export type ClassDocument = Class & Document;

@Schema()
export class Class {
  @Prop({ maxlength: 24, default: '' })
  name: string;

  @Prop({ default: '' })
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
      type: ClassAttendance,
    },
  ])
  classAttendance: ClassAttendance[];

  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: 'User' })
  teacherId: ObjectId;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
