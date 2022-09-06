import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 32,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  })
  email: string;

  // DO NOT ADD MAX LENGTH HERE. This is where the hash is stored!
  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    minlength: 3,
    maxlength: 24,
    match: [
      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
      'Please only use valid characters',
    ],
  })
  firstName: string;

  @Prop({
    required: true,
    minlength: 3,
    maxlength: 24,
    match: [
      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
      'Please only use valid characters',
    ],
  })
  lastName: string;

  @Prop({
    required: true,
    default: 'teacher',
    enum: ['admin', 'teacher', 'student'],
  })
  role: string;

  @Prop({
    default: false,
  })
  adminApproved: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
