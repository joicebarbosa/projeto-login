import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth') // Define o prefixo da rota para este controlador (ex: /auth/register)
export class AuthController {
  constructor(private readonly authService: AuthService) {} // Injete o AuthService

  @Post('register') // Endpoint para cadastro: POST /auth/register
  @HttpCode(HttpStatus.CREATED) // Retorna status 201 Created em caso de sucesso
  async register(@Body() registerUserDto: RegisterUserDto) {
    // O ValidationPipe já validou o registerUserDto automaticamente
    const user = await this.authService.register(registerUserDto);
    return {
      message: 'Usuário cadastrado com sucesso!',
      user,
    };
  }

  @Post('login') // Endpoint para login: POST /auth/login
  @HttpCode(HttpStatus.OK) // Retorna status 200 OK em caso de sucesso
  async login(@Body() loginUserDto: LoginUserDto) {
    // O ValidationPipe já validou o loginUserDto automaticamente
    const user = await this.authService.login(loginUserDto);
    return {
      message: 'Login realizado com sucesso!',
      user,
    };
  }
}