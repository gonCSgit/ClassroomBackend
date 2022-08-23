import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserDto } from '../dto/user.dto';
import { UsersService } from '../users.service';

interface ReqWCurrentUser extends Request {
  currentUser?: UserDto;
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: ReqWCurrentUser, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      // TBD add role to session object?
      const user = await this.usersService.findById(userId);
      req.currentUser = user;
    }

    next();
  }
}
