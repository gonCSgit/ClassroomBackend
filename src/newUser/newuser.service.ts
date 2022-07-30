import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class NewUserService {
  constructor(
    @InjectModel('User') private readonly newUserModule: Model<User>,
    private userService: UsersService,
  ) {}

  async newUser(user: string, password: string) {
    const count = await this.userService.countUsernames(user);
    if (count !== 0) {
      throw new HttpException('username already exists', HttpStatus.FORBIDDEN);
    } else {
      const newUser = new this.newUserModule({
        username: user,
        password: await bcrypt.hash(password, 10),
      });
      return await newUser.save();
    }
  }
}
