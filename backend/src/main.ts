// backend/src/main.ts
import { NestFactory, Reflector } from '@nestjs/core'; // Importe Reflector
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'; // Importe o JwtAuthGuard
// NÃO importe AuthModule aqui diretamente

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // REGISTRAR JWTAuthGuard GLOBALMENTE
  // Todas as rotas agora exigirão um JWT válido, a menos que marcadas com @Public()
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  await app.listen(3000);
  console.log(`Backend NestJS rodando em ${await app.getUrl()}`);
}

bootstrap().catch((err: unknown) => {
  console.error('Erro ao iniciar a aplicação NestJS:', err);
  process.exit(1);
});