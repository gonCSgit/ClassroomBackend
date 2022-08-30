import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @Length(3, 32)
  password: string;
}
