import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // If it returns falsy access will be denied because canActivate will return false.
    return request.session.userId;
  }
}
