import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentsService } from './students.service';

@Controller('student')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async newStudent(
    @Body() student: CreateStudentDto,
    @CurrentUser() currentUser: UserDto,
  ) {
    return this.studentsService.newStudent(student, currentUser);
  }
}
