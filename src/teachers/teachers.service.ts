import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherDto } from './dto/teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel('Teacher') private readonly teacherModel: Model<TeacherDto>,
  ) {}

  async newTeacher(teacher: CreateTeacherDto, currentUser: UserDto) {
    const existingTeacher = await this.teacherModel.findOne({
      user_id: currentUser,
    });
    if (!existingTeacher) {
      const newTeacher = new this.teacherModel({
        userId: currentUser._id,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
      });
      return await newTeacher.save();
    }
    throw new UnauthorizedException('Teacher can only be assigned to one User');
  }
}
