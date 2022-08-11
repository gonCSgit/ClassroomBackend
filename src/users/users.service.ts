import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
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

  async findById(id: Schema.Types.ObjectId) {
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

  // The Object.assign(target, source) method copies all enumerable own properties
  // from one or more source objects to a target object.
  // It returns the modified target object.
  async update(id: Schema.Types.ObjectId, attrs: Partial<UserDto>) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    // TBD: Encryption needs to happen again if password is changed
    Object.assign(user, attrs);
    return await user.save();
  }

  async remove(id: Schema.Types.ObjectId) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.remove();
  }
}
