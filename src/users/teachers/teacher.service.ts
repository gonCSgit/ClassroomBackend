import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import { UsersService } from '../users.service';

@Injectable()
export class TeachersService {
  constructor(
    private usersService: UsersService,
    @InjectModel('User') private readonly userModel: Model<UserDto>,
  ) {}

  async approveById(teacherId: string) {
    const teacherObj = await this.userModel.findById(teacherId);
    if (teacherObj.role === 'teacher') {
      try {
        await this.userModel.findByIdAndUpdate(teacherId, {
          adminApproved: true,
        });
      } catch (error) {
        return console.log(error);
      }
    }
  }
}
