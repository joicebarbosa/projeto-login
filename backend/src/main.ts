// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Adicione o ValidationPipe globalmente para validação de DTOs.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // Retorna erro se houver propriedades não permitidas
      transform: true, // Transforma payloads em instâncias do DTO
    }),
  );

  // --- CONFIGURAÇÃO CORS ---
  // Permite que o frontend (http://localhost:3001) se comunique com este backend.
  app.enableCors({
    origin: 'http://localhost:3001', // Importante: deve ser a URL exata do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP que seu frontend usará
    credentials: true, // Necessário se você for usar cookies ou credenciais em requisições
  });
  // -------------------------

  // Inicia o servidor NestJS na porta 3000.
  await app.listen(3000); //
  console.log(`Backend NestJS rodando em ${await app.getUrl()}`);
}

// Chama a função bootstrap e trata a Promise que ela retorna.
// Isso resolve o erro "A Promises must be awaited...".
bootstrap().catch((err: unknown) => {
  // O 'err' foi tipado como 'unknown'
  console.error('Erro ao iniciar a aplicação NestJS:', err);
  process.exit(1); // Encerra o processo com um código de erro se a inicialização falhar
});
