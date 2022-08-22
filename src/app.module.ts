import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeachersModule } from './teachers/teachers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TeachersModule,
    MongooseModule.forRoot(
      'mongodb+srv://dummyaccount123:qwerty4321@cluster0.s2ypjr7.mongodb.net/classroom?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
