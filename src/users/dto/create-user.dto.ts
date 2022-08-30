import { IsAlpha, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Length(3, 32)
  password: string;

  @Length(3, 24)
  @IsAlpha()
  firstName: string;

  @Length(3, 24)
  @IsAlpha()
  lastName: string;
}
