import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninRecipientDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
