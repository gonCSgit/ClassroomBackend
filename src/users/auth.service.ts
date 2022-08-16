import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectModel('User') private readonly userModel: Model<CreateUserDto>,
  ) {}

  // Never pass a plain object to save method! By creating an instance
  // from the model we are making sure any hooks defined on the schema will
  // be executed.

  async signup(user: CreateUserDto) {
    const newUser = new this.userModel({
      username: user.username,
      password: await bcrypt.hash(user.password, 10),
    });
    return await newUser.save();
  }

  //   signin() {}
}
