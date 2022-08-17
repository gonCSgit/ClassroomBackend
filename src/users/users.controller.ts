import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
// import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

// This custom decorator would serialize outgoing responses by remove the password prop.
// But because mongoose is able to do this at the service level I will not use it.

// @Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/colors/:color')
  // setColor(@Param('color') color: string, @Session() session: any) {
  //   session.color = color;
  // }

  // @Get('/colors')
  // getColor(@Session() session: any) {
  //   return session.color;
  // }

  @Get('/whoami')
  whoAmI(@Session() session: any) {
    return this.usersService.findById(session.userId);
  }

  @Post('/signup')
  async newUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    console.log('handler is running');
    return await this.usersService.findById(id);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() attrs: UpdateUserDto) {
    return await this.usersService.update(id, attrs);
  }
}
