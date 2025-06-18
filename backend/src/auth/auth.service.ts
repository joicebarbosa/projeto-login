import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {} // Injete o PrismaService

  async register(registerUserDto: RegisterUserDto) {
    const { email, password, name } = registerUserDto;

    // 1. Verificar se o email já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Este email já está cadastrado.');
    }

    // 2. Hash da senha
    const saltRounds = 10; // Número de rounds para gerar o salt (quanto maior, mais seguro, mas mais lento)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Salvar o novo usuário no banco de dados
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword, // Salvar a senha hashada
        name,
      },
      select: { // Retornar apenas os dados que você quer expor
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // 1. Buscar o usuário pelo email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.'); // Não informar se é email ou senha errados por segurança
    }

    // 2. Comparar a senha fornecida com a senha hashada no banco de dados
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // 3. Retornar os dados do usuário (sem a senha hashada)
    // Em um sistema real, você retornaria um JWT aqui. Por enquanto, só os dados básicos.
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}