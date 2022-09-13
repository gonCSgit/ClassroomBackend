import { Controller, Param, Put } from '@nestjs/common';
import { TeachersService } from './teacher.service';

@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Put(':id')
  //Make change in portfolio :teacherId
  async approveTeacher(@Param('id') param: string) {
    const approval = await this.teachersService.approveById(param);
    return approval;
  }
}
