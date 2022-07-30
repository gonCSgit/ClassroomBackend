import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }
  async countUsernames(username: string): Promise<number> {
    return this.userModel.countDocuments({ username: username }).exec();
  }
}
