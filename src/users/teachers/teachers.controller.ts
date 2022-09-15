import { Controller, Get, Param, Put } from '@nestjs/common';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Put(':id')
  //Make change in portfolio :teacherId
  async approveTeacher(@Param('id') param: string) {
    const approval = await this.teachersService.approveById(param);
    return approval;
  }

  @Get()
  async findAll() {
    const list = await this.teachersService.findAllTeachers();
    return list;
  }
}
