// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Importe ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Adicione o ValidationPipe globalmente
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades que não estão definidas no DTO
    forbidNonWhitelisted: true, // Lança um erro se houver propriedades não definidas no DTO
    transform: true, // Transforma automaticamente os payloads para instâncias do DTO
  }));

  await app.listen(3000);
}
bootstrap();