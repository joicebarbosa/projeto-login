// backend/src/auth/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core'; // Para ler metadados de decorators

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Verifica se a rota é pública usando o nosso decorator @Public()
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true; // Se for pública, permite o acesso sem autenticação
    }
    return super.canActivate(context); // Se não for pública, continua com a validação JWT
  }

  // Opcional: tratamento de exceção customizado para JWT
  handleRequest(err, user, info) {
    if (err || !user) {
      if (info && info.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado.');
      }
      if (info && info.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token inválido.');
      }
      throw err || new UnauthorizedException('Credenciais inválidas.');
    }
    return user;
  }
}