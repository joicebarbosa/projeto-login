// backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Importe JwtService do NestJS JWT
import { PrismaService } from '../prisma/prisma.service'; // Importe seu PrismaService
import * as bcrypt from 'bcrypt'; // Importe bcrypt para comparação de senhas

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, // Injeção de dependência do PrismaService
    private jwtService: JwtService, // Injeção de dependência do JwtService
  ) {}

  // Método para validar um usuário (usado no login)
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      return null; // Usuário não encontrado
    }

    // Compara a senha fornecida com a senha hash armazenada
    const isPasswordMatching = await bcrypt.compare(pass, user.password);

    if (!isPasswordMatching) {
      return null; // Senha incorreta
    }

    // Se a validação for bem-sucedida, retorna o usuário sem a senha
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  // Método para gerar o token JWT após a validação bem-sucedida
  async login(user: any) {
    // O payload do token JWT, geralmente contém informações do usuário que não são sensíveis
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload), // Gera o token assinado
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  // Método de registro que você já deve ter ou que podemos refatorar para cá
  // Se você já tem o registro em UsersService, pode mantê-lo lá
  // ou movê-lo para cá, para centralizar lógica de auth. Por enquanto, manteremos.
}