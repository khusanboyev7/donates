import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Foydalanuvchi topilmadi');
    }

    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Faqat adminlar uchun ruxsat berilgan');
    }

    return true;
  }
}
