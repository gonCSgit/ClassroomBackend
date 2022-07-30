import { NewUserService } from './newuser.service';
export declare class NewUserController {
    private readonly appService;
    constructor(appService: NewUserService);
    newUser(username: string, password: string): Promise<any>;
}
