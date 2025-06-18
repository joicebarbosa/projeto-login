// src/prisma/prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Torna o PrismaService disponível globalmente, sem precisar importar em cada módulo
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporta o serviço para ser usado em outros lugares
})
export class PrismaModule {}