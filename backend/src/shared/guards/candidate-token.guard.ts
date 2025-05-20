import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CandidateTokenGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const token = req.headers['x-candidate-token'];
    return typeof token === 'string' && token.length > 0;
  }
}
