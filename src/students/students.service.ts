import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentDto } from './dto/student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<StudentDto>,
  ) {}

  async newStudent(student: CreateStudentDto, currentUser: UserDto) {
    const existingStudent = await this.studentModel.findOne({
      user_id: currentUser,
    });
    if (!existingStudent) {
      const newStudent = new this.studentModel({
        userId: currentUser._id,
        firstName: student.firstName,
        lastName: student.lastName,
      });
      return await newStudent.save();
    }
    throw new UnauthorizedException('Student can only be assigned to one User');
  }
}
