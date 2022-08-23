import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type StudentEnrollDocument = StudentEnroll & Document;

@Schema()
export class StudentEnroll {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  })
  studentId: ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  })
  subjectId: ObjectId;
}

export const StudentEnrollSchema = SchemaFactory.createForClass(StudentEnroll);
