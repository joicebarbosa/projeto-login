import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { LoginDto } from './dto/login.dto'; // Este DTO não é usado diretamente aqui, o req.user já vem do guard
import { RegisterDto } from './dto/register.dto'; // <-- Importe o RegisterDto

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register') // <-- NOVO ENDPOINT DE REGISTRO
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto); // Chama o método register no AuthService
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // req.user é populado pelo LocalAuthGuard após o validateUser do AuthService
    return this.authService.login(req.user); // Usa o AuthService para gerar o JWT
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
