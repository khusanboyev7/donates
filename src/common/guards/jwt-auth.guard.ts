import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly JwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException("AutHeader topilmadi");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Token topilmadi");
    }
    let decodedToken: any;
    try {
      decodedToken = this.JwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException({
        message: "Token yaroqsiz",
        error: error.message,
      });
    }
    request.user = decodedToken;
    return true;
  }
}
