import { ObjectId } from 'mongoose';
export interface User {
    _id: ObjectId;
    username: string;
    password: string;
    __v: number;
}
