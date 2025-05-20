import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CandidateTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['x-candidate-token'];
    return !!token;
  }
}
