import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // <-- Adicionar esta importação
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto'; // Usaremos RegisterDto
// import { LoginUserDto } from './dto/login-user.dto'; // ESTE DTO NÃO É MAIS NECESSÁRIO AQUI PARA O MÉTODO LOGIN
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService, // <-- Injete o JwtService AQUI
  ) {}

  // ----------------------------------------------------
  // MÉTODO validateUser - USADO PELO LocalStrategy
  // ----------------------------------------------------
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      return null; // Usuário não encontrado
    }

    const isPasswordMatching = await bcrypt.compare(pass, user.password);

    if (!isPasswordMatching) {
      return null; // Senha incorreta
    }

    // Se a validação for bem-sucedida, retorna o usuário sem a senha
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  // ----------------------------------------------------
  // MÉTODO register - PARA CRIAR NOVOS USUÁRIOS
  // ----------------------------------------------------
  async register(registerDto: RegisterDto) {
    // Use RegisterDto
    const { email, password, name } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Este email já está cadastrado.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true, // Adicionado updatedAt para consistência
      },
    });

    return newUser;
  }

  // ----------------------------------------------------
  // MÉTODO login - GERA O JWT APÓS A VALIDAÇÃO
  // ----------------------------------------------------
  // O 'user' aqui vem do req.user, populado pelo LocalAuthGuard/validateUser
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
}
