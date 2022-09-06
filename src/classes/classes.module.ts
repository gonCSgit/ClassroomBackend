import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassSchema } from '../entities/class.schema';
import { UserSchema } from '../entities/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Class', schema: ClassSchema }]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class UsersModule {}
