import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<CreateUserDto>,
  ) {}

  async findOneByUsername(username: string) {
    return this.userModel.findOne({ username: username }).exec();
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  // async find(class_id: string) {
  //   return this.userModel.find({ class_id });
  // }

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

  async update(id: string, attrs: UserDto) {
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
