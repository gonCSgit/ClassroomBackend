import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type ClassAttendanceDocument = ClassAttendance & Document;

@Schema()
export class ClassAttendance {
  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: 'User' })
  studentId: ObjectId;

  @Prop({
    unique: true,
    minlength: 3,
    maxlength: 32,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  })
  email: string;

  @Prop({ default: false, required: true })
  attendance: boolean;

  @Prop({ enum: [...Array(21).keys()], default: 0 })
  evaluation: number;
}

export const ClassAttendanceSchema =
  SchemaFactory.createForClass(ClassAttendance);
