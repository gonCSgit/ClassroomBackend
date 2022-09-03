/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    whoAmI(user: any): any;
    newUser(body: CreateUserDto): Promise<string>;
    signin(body: LoginUserDto, session: any): Promise<{
        id: import("mongoose").Schema.Types.ObjectId;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    }>;
    signOut(session: any): Promise<void>;
    findById(id: string): Promise<import("mongoose").Document<unknown, any, import("./dto/user.dto").UserDto> & import("./dto/user.dto").UserDto & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    removeUser(id: string): Promise<import("mongoose").Document<unknown, any, import("./dto/user.dto").UserDto> & import("./dto/user.dto").UserDto & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateUser(id: string, attrs: UpdateUserDto): Promise<import("mongoose").Document<unknown, any, import("./dto/user.dto").UserDto> & import("./dto/user.dto").UserDto & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
