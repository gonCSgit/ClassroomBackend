import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('class')
export class ClassesController {
  constructor(
    private usersService: UsersService,
    private classesService: ClassesService,
  ) {}

  @Post('/')
  async newClass(@Body() body: CreateClassDto) {
    const classes = await this.classesService.newClass(body);
    return classes;
  }

  //   @Get('/:id')
  //   async findById(@Param('id') id: string) {
  //     return await this.classesService.findById(id);
  //   }
}
