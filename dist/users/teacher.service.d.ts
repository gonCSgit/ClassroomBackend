import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDto>);
}
