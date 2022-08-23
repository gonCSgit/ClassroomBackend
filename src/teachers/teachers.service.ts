import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherDto } from './dto/teacher.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel('Teacher') private readonly teacherModel: Model<TeacherDto>,
    @InjectModel('User') private readonly userModel: Model<UserDto>,
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

  async teacherSignup(teacher: CreateTeacherDto) {
    const newUser = new this.userModel({
      username: teacher.username,
      password: await bcrypt.hash(teacher.password, 10),
    });
    try {
      await newUser.save();
    } catch (error) {
      throw new UnauthorizedException('Username already exists');
    }
    const newTeacher = new this.teacherModel({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      userId: newUser._id,
    });
    try {
      await newTeacher.save();
    } catch (error) {
      throw new ConflictException('Couldnt assign a teacher model');
    }
    return newTeacher;
  }
}
