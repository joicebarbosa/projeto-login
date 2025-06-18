// src/auth/dto/register-user.dto.ts
import { IsString, IsEmail, MinLength, Matches, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  // Regex para validar o formato "nome.sobrenome".
  // Aceita letras (incluindo acentuadas), hífens e apóstrofos dentro dos nomes,
  // e garante que haja um ponto entre o nome e o sobrenome.
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[\s-][A-Za-zÀ-ÖØ-öø-ÿ]+)*\.[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[\s-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/, {
    message: 'O nome deve estar no formato "nome.sobrenome" e conter apenas letras.'
  })
  name: string;

  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail({}, { message: 'Por favor, insira um email válido.' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  // Garante pelo menos uma letra maiúscula
  @Matches(/(?=.*[A-Z])/, { message: 'A senha deve conter pelo menos uma letra maiúscula.' })
  // Garante pelo menos um caractere especial. Lista comuns: !@#$%^&*()-+_=[]{}|;:'",.<>/?`~
  @Matches(/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, {
    message: 'A senha deve conter pelo menos um caractere especial.'
  })
  password: string;
}