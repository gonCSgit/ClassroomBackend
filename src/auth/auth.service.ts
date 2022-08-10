import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Passport strategy will expect a full user if validation is successful or a null if it fails
  // Failure is defined as either the user is not found, or, in the case of passport-local, the password does not match
  async validateUser(username: string, pass: string): Promise<UserDto> {
    const user = await this.usersService.findOne(username);
    if (await bcrypt.compare(pass, user.password)) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async login(user) {
    const payload = { username: user.username, sub: user._id.toString() };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
