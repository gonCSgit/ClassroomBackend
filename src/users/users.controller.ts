import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Schema } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async newUser(@Body() body: CreateUserDto) {
    await this.usersService.newUser(body);
    return null;
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }

  //TBD: Fix patch method
  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() attrs: UpdateUserDto) {
    return await this.usersService.update(id, attrs);
  }
}
