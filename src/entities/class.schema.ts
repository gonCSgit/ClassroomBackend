import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type ClassDocument = Class & Document;

@Schema()
export class Class {
  @Prop({ maxlength: 24 })
  name: string;

  @Prop()
  summary: string;

  @Prop({ type: mongoose.SchemaTypes.Date })
  date: Date;

  @Prop({
    enum: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300],
    default: 0,
  })
  duration: number;

  // @Prop()
  // students: ObjectId[];

  @Prop()
  teacher: ObjectId;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
