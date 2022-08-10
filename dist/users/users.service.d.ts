import { Model } from 'mongoose';
import { User } from 'src/dto/user.dto';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findOne(username: string): Promise<User>;
    countUsernames(username: string): Promise<number>;
}
