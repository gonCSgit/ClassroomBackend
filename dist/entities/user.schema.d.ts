import mongoose, { Document, ObjectId } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    classes: ObjectId[];
    adminApproved: boolean;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, any, {}, "type", User>;
