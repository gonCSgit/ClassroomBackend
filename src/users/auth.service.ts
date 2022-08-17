import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

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
    try {
      await newUser.save();
    } catch (error) {
      throw new UnauthorizedException('Username already exists');
    }
    return newUser;
  }

  async signin(user: LoginUserDto) {
    const userQ = await this.userModel
      .findOne({ username: user.username })
      .exec();
    if (!userQ) {
      throw new NotFoundException('User not found');
    }
    if ((await bcrypt.compare(user.password, userQ.password)) === false) {
      throw new UnauthorizedException();
    }
    return userQ;
  }
}