import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassAttendanceSchema } from 'src/entities/class-attendance.schema';
import { UsersService } from 'src/users/users.service';
import { ClassSchema } from '../entities/class.schema';
import { UserSchema } from '../entities/user.schema';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Class', schema: ClassSchema },
      { name: 'ClassAttendance', schema: ClassAttendanceSchema },
    ]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService, UsersService],
})
export class ClassesModule {}
