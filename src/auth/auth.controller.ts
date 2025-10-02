import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SigninAdminDto } from '../admin/dto/signin-admin.dto';
import { CreateRecipientDto } from '../recipient/dto/create-recipient.dto';
import { SigninRecipientDto } from '../recipient/dto/signin-recipent.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/signup')
  signupAdmin(@Body() dto: CreateAdminDto) {
    return this.authService.signupAdmin(dto);
  }

  @Post('admin/signin')
  signinAdmin(@Body() dto: SigninAdminDto) {
    return this.authService.signinAdmin(dto);
  }

  @Post('recipient/signup')
  signupRecipient(@Body() dto: CreateRecipientDto) {
    return this.authService.signupRecipient(dto);
  }

  @Post('recipient/signin')
  signinRecipient(@Body() dto: SigninRecipientDto) {
    return this.authService.signinRecipient(dto);
  }
}
