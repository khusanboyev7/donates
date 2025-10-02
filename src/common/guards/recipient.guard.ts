import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RecipientGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Foydalanuvchi topilmadi');
    }

    if (user.role !== 'RECIPIENT') {
      throw new ForbiddenException('Faqat recipientlar uchun ruxsat berilgan');
    }

    return true;
  }
}
