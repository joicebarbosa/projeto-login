import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service'; // Importe o PrismaService

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {} // Injete o PrismaService

  getHello(): string {
    // Exemplo de como usar o prisma client:
    // this.prisma.user.findMany().then(users => console.log(users));
    return 'Hello World!';
  }
}