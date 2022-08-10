import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class NewUserService {
  constructor(
    @InjectModel('User') private readonly newUserModule: Model<CreateUserDto>,
  ) {}

  async newUser(user: string, password: string) {
    const newUser = new this.newUserModule({
      username: user,
      password: await bcrypt.hash(password, 10),
    });
    return await newUser.save();
  }
}
