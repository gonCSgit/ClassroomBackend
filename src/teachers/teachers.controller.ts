import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeachersService } from './teachers.service';

@Controller('teacher')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async newTeacher(
    @Body() teacher: CreateTeacherDto,
    @CurrentUser() currentUser: UserDto,
  ) {
    return this.teachersService.newTeacher(teacher, currentUser);
  }
}
