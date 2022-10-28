import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
// import { UsersService } from 'src/users/users.service';
import { AttendanceService } from './attendance.service';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('class')
export class ClassesController {
  constructor(
    // private usersService: UsersService,
    private classesService: ClassesService,
    private attendanceService: AttendanceService,
  ) {}

  @Post()
  async newClass(@Body() body: CreateClassDto) {
    const classes = await this.classesService.newClass(body);
    return classes;
  }

  @Get('all')
  async findAll() {
    const list = await this.classesService.findAllClasses();
    return list;
  }

  @Post(':classId')
  async newAttendance(@Param('classId') param: string, @Body() body?: string) {
    const attendance = await this.attendanceService.newAttendance(param, body);
    return attendance;
  }

  @Get('student')
  @UseGuards(AuthGuard)
  async studentAssigned(@CurrentUser() param: any) {
    const assignedAttendance = await this.classesService.findAttendance(
      param.email,
    );
    return assignedAttendance;
  }

  @Get('teacher')
  @UseGuards(AuthGuard)
  async teacherAssigned(@CurrentUser() param: any) {
    const assignedClasses = await this.classesService.findClasses(param.email);
    return assignedClasses;
  }
}
