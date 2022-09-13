import { Expose } from 'class-transformer';
import { IsBoolean, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @IsBoolean()
  adminApproval: boolean;
}
