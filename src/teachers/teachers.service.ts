import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherDto } from './dto/teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel('Teacher') private readonly teacherModel: Model<TeacherDto>,
  ) {}

  async newTeacher(teacher: CreateTeacherDto, currentUser) {
    const newTeacher = new this.teacherModel({
      user_id: currentUser,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
    });
    try {
      console.log(newTeacher);
      await newTeacher.save();
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return newTeacher;
  }
}
