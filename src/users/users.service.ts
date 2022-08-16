import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<CreateUserDto>,
  ) {}

  async findOneByUsername(username: string) {
    // find({ username: username }, '-password')  test later
    return this.userModel.findOne({ username: username }).exec();
  }

  async findById(id: string) {
    // Will return every field available except the password
    return await this.userModel.findById(id, '-password');
  }

  // Never pass a plain object to save method! By creating an instance
  // from the model we are making sure any hooks defined on the schema will
  // be executed.
  async newUser(user: CreateUserDto) {
    const newUser = new this.userModel({
      username: user.username,
      password: await bcrypt.hash(user.password, 10),
    });
    return await newUser.save();
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
