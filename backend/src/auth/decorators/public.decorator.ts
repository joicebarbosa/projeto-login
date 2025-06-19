// backend/src/auth/decorators/public.decorator.ts
import { SetMetadata } from '@nestjs/common';

// Chave de metadados para identificar rotas públicas
export const IS_PUBLIC_KEY = 'isPublic';
// Decorator @Public() que pode ser usado em rotas para marcá-las como públicas
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);