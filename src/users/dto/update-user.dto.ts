import { IsBoolean, IsEmail, Length } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @Length(3, 32)
  password: string;

  @IsBoolean()
  adminApproval: boolean;
}
