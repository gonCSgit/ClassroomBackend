import mongoose from 'mongoose';
export declare class CreateUserDto {
    _id: mongoose.ObjectId;
    role: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
