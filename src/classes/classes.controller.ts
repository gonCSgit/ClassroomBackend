import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  //   @Get('/all/:id')
  //   async findById(@Param('id') id: string) {
  //     return await this.classesService.findById(id);
  //   }
  @Get()
  async findAll() {
    const list = await this.classesService.findAllClasses();
    return list;
  }

  @Post(':id')
  async newAttendance(@Param('id') param: string, @Body() body?: string) {
    const attendance = await this.attendanceService.newAttendance(param, body);
    return attendance;
  }
}
