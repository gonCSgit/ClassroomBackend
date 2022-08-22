import { Expose } from 'class-transformer';

export class StudentDto {
  @Expose()
  _id: string;

  @Expose()
  user_id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}
