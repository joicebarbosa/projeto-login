// backend/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule, // Importe ConfigModule para poder usar ConfigService
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Importe ConfigModule aqui também para o useFactory
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Pega o JWT_SECRET do .env
        signOptions: { expiresIn: '60m' }, // Token expira em 60 minutos
      }),
      inject: [ConfigService], // Injete ConfigService no useFactory
    }),
  ],
  controllers: [AuthController], // Adicione seu AuthController aqui
  providers: [AuthService, JwtStrategy, LocalStrategy, PrismaService], // Adicione seus services e strategies
  exports: [AuthService], // Exporte AuthService se for usado em outros módulos
})
export class AuthModule {} // Certifique-se que o nome da classe é AuthModule