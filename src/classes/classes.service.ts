import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    private usersService: UsersService,
    @InjectModel('User') private readonly userModel: Model<CreateUserDto>,
    @InjectModel('Class') private readonly classModel: Model<CreateClassDto>,
  ) {}

  async newClass(classObject: CreateClassDto) {
    const newClassObject = new this.classModel({
      name: classObject.name,
      summary: classObject.summary,
      date: classObject.date,
      duration: classObject.duration,
    });
    try {
      await newClassObject.save();
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return newClassObject;
  }
}