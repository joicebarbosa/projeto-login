// backend/src/auth/dto/register.dto.ts
import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  name: string;

  @IsEmail({}, { message: 'O email deve ser um endereço de email válido.' })
  email: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;
}