import { Body, Controller, Post } from '@nestjs/common';
import { NewUserService } from './newuser.service';

@Controller('newuser')
export class NewUserController {
  constructor(private readonly appService: NewUserService) {}

  @Post()
  async newUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    await this.appService.newUser(username, password);
    return null;
  }
}
