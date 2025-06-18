// src/auth/dto/login-user.dto.ts
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail({}, { message: 'Por favor, insira um email válido.' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  password: string;
}