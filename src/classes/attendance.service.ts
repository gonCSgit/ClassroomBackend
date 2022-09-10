import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel('ClassAttendance')
    private readonly classAttendanceModel: Model<CreateAttendanceDto>,
  ) {}

  async newAttendance(studentId?: string) {
    let newAttendanceObject = new this.classAttendanceModel();
    if (studentId)
      newAttendanceObject = new this.classAttendanceModel({
        studentId: studentId,
      });
    try {
      await newAttendanceObject.save();
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return newAttendanceObject;
  }
}
