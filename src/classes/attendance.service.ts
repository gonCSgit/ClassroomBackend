import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassesService } from './classes.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel('ClassAttendance')
    private readonly classAttendanceModel: Model<CreateAttendanceDto>,
    private classesServices: ClassesService,
  ) {}

  async newAttendance(classId: string, studentId?: string) {
    const classIdObj = await this.classesServices.classById(classId);
    let newAttendanceObject = new this.classAttendanceModel();
    //TBD: MAKE STUDENT ATTENDANCE UNIQUE
    if (studentId)
      newAttendanceObject = new this.classAttendanceModel({
        studentId: studentId,
      });
    classIdObj.classAttendance.push(newAttendanceObject);
    try {
      classIdObj.save();
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return newAttendanceObject;
  }
}
