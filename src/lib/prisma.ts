// Prisma 7からアダプターが必要になった。
// インストールしたパッケージ
// @prisma/adapter-pg - PostgreSQLアダプター
// @types/pg - TypeScript型定義

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma 7では、アダプターが必須
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ['query'], // 実行されたSQLがログに出る（デバッグ用）
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
