import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://dummyaccount123:qwerty4321@cluster0.s2ypjr7.mongodb.net/classroom?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
