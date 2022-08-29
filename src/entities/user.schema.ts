import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

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

  @Prop({ required: true, minlength: 3, maxlength: 32 })
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
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Class',
    default: [],
  })
  classes: ObjectId[];

  @Prop({
    default: false,
  })
  adminApproved: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
