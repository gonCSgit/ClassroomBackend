import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDto>,
  ) {}

  async findByEmail(email: string) {
    // find({ username: username }, '-password')  test later
    return this.userModel.find({ email: email }, '-password');
  }

  async findUserById(id: string) {
    // Will return every field available except the password
    return await this.userModel.findById(id, '-password');
  }

  async findAllStudents() {
    return await this.userModel.find({ role: 'student' }, '-password');
  }

  async findAllTeachers() {
    return await this.userModel.find({ role: 'teacher' }, '-password');
  }

  async update(id: string, attrs: Omit<UserDto, 'role'>) {
    const existingUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      attrs,
      {
        new: true,
      },
    );
    return existingUser;
  }

  async remove(id: string) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.remove();
  }
}
