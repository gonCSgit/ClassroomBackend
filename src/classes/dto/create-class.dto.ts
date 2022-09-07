import { IsAlpha, IsDateString, Length } from 'class-validator';
import mongoose from 'mongoose';

export class CreateClassDto {
  @Length(1, 24)
  @IsAlpha()
  name: string;

  summary: string;

  @IsDateString()
  date: DateConstructor;

  duration: 0 | 30 | 60 | 90 | 120 | 150 | 180 | 210 | 240 | 270 | 300;

  teacherId: mongoose.ObjectId;
}
