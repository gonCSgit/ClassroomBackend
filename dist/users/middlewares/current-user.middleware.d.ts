import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserDto } from '../dto/user.dto';
import { UsersService } from '../users.service';
interface ReqWCurrentUser extends Request {
    currentUser?: UserDto;
}
export declare class CurrentUserMiddleware implements NestMiddleware {
    private usersService;
    constructor(usersService: UsersService);
    use(req: ReqWCurrentUser, res: Response, next: NextFunction): Promise<void>;
}
export {};
