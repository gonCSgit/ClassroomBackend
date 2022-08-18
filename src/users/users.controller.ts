import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
// Interceptors are decorators able to modify outgoing objects
// before and/or after they've been handled
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  // When passing an argument to a custom decorator it will
  // be used as the first parameter in its decorator function definition
  whoAmI(@CurrentUser() user: any) {
    return user;
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
    // console.log('handler is running');
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
