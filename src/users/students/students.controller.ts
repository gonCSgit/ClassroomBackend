import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  async findAll() {
    const list = await this.studentsService.findAllStudents();
    return list;
  }

  @Post()
  async createStudent(@Body() body: CreateUserDto) {
    const user = await this.studentsService.newStudent(body);
    return [user.email, user.role];
  }
}
