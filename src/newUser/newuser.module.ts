import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/user.schema';
import { UsersModule } from '../users/users.module';
import { NewUserController } from './newuser.controller';
import { NewUserService } from './newuser.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UsersModule,
  ],
  controllers: [NewUserController],
  providers: [NewUserService],
})
export class NewUserModule {}
