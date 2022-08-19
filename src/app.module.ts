import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { TeachersModule } from './teachers/teachers.module';
import { CurrentUserInterceptor } from './users/interceptors/current-user.interceptor';
import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
// import { AppController } from './app.controller';

@Module({
  imports: [
    UsersModule,
    TeachersModule,
    MongooseModule.forRoot(
      'mongodb+srv://dummyaccount123:qwerty4321@cluster0.s2ypjr7.mongodb.net/classroom?retryWrites=true&w=majority',
    ),
    // AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  // controllers: [AppController],
})
export class AppModule {}
