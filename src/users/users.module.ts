import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../entities/user.schema';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { TeachersService } from './teachers/teachers.service';
import { TeachersController } from './teachers/teachers.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { StudentsController } from './students/students.controller';
import { StudentsService } from './students/students.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController, TeachersController, StudentsController],
  providers: [UsersService, AuthService, TeachersService, StudentsService],
  exports: [UsersService, AuthService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
