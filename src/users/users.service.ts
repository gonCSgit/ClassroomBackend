import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
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

  async findById(id: string) {
    // Will return every field available except the password
    return await this.userModel.findById(id, '-password');
  }

  async findAllStudents() {
    return await this.userModel.find({ role: 'student' }, '-password');
  }

  async findAllTeachers() {
    return await this.userModel.find({ role: 'teacher' }, '-password');
  }

  async update(id: string, attrs: UpdateUserDto) {
    // TBD: Encryption needs to happen again if password is changed
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
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.remove();
  }
}
