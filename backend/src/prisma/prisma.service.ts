// src/prisma/prisma.service.ts
import { INestApplication, Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect(); // Conecta-se ao banco de dados quando o módulo é inicializado
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Desconecta-se do banco de dados quando o módulo é destruído
  }

  // Opcional: Adicionar um hook para 'enableShutdownHooks'
  // Isso é útil para garantir que o aplicativo NestJS encerre o Prisma Client corretamente
  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}