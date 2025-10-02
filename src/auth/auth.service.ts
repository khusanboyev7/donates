import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admin/models/admin.model';
import { Recipient } from '../recipient/models/recipient.model';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SigninAdminDto } from '../admin/dto/signin-admin.dto';
import { CreateRecipientDto } from '../recipient/dto/create-recipient.dto';
import { SigninRecipientDto } from '../recipient/dto/signin-recipent.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private async generateToken(user: any, role: string) {
    const payload = { id: user.id, email: user.email, role };
    return { token: this.jwtService.sign(payload) };
  }

  async signupAdmin(dto: CreateAdminDto) {
    const candidate = await Admin.findOne({ where: { email: dto.email } });
    if (candidate) throw new ConflictException('Bunday admin mavjud!');

    dto.password = await bcrypt.hash(dto.password, 7);
    const newAdmin = await Admin.create(dto as any);
    return this.generateToken(newAdmin, 'ADMIN');
  }

  async signinAdmin(dto: SigninAdminDto) {
    const admin = await Admin.findOne({ where: { email: dto.email } });
    if (!admin) throw new UnauthorizedException("Email yoki parol noto'g'ri!");

    const verify = await bcrypt.compare(dto.password, admin.password);
    if (!verify) throw new UnauthorizedException("Email yoki parol noto'g'ri!");

    return this.generateToken(admin, 'ADMIN');
  }

  async signupRecipient(dto: CreateRecipientDto) {
    const candidate = await Recipient.findOne({ where: { email: dto.email } });
    if (candidate) throw new ConflictException('Bunday recipient mavjud!');

    dto.password = await bcrypt.hash(dto.password, 7);
    const newRecipient = await Recipient.create(dto as any);
    return this.generateToken(newRecipient, 'RECIPIENT');
  }

  async signinRecipient(dto: SigninRecipientDto) {
    const recipient = await Recipient.findOne({ where: { email: dto.email } });
    if (!recipient)
      throw new UnauthorizedException("Email yoki parol noto'g'ri!");

    const verify = await bcrypt.compare(dto.password, recipient.password);
    if (!verify) throw new UnauthorizedException("Email yoki parol noto'g'ri!");

    return this.generateToken(recipient, 'RECIPIENT');
  }
}
