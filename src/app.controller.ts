import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  // While passing AuthGuard('local') in the @UseGuards decorator is fine it is
  // recommended that we create their own class. Hence local-auth.guard.ts.
  @UseGuards(LocalAuthGuard)
  @Post()
  // The req object originates from the validate() method,
  // automatically created by Passport in the local.strategy
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // The Guard will automatically invoke our passport-jwt custom
  // configured logic, validating the JWT, and
  // assigning the user property to the Request object.
  @UseGuards(JwtAuthGuard)
  //Profile Route for testing purposes
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
