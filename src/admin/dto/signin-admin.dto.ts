import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninAdminDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
