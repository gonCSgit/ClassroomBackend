import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDto>,
  ) {}

  async findAllStudents() {
    return await this.userModel.find({ role: 'student' }, '-password');
  }

  async newStudent(user: CreateUserDto) {
    const newUser = new this.userModel({
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
      firstName: user.firstName,
      lastName: user.lastName,
      role: 'student',
    });
    try {
      await newUser.save();
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Email already exists');
    }
    return newUser;
  }
}
