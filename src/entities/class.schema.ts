import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type ClassDocument = Class & Document;

@Schema()
export class Class {
  @Prop()
  summary: string;

  @Prop()
  date: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  })
  subjectId: ObjectId;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
