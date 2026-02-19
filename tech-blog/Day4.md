# Prismaセットアップ時に出たPrismaClientインポート時のエラーについて

・「Prisma本体（CLI）」と「Prismaクライアント（ライブラリ）」のバージョンがズレていると、型定義がバグってエラーが出る

## 解決方法：バージョンを揃えて再インストール

# 1. 既存のPrisma関連を削除

```sh
npm uninstall prisma @prisma/client
```

# 2. 最新版をインストール（これでバージョンが揃う）

```sh
npm install -D prisma
npm install @prisma/client
```

# 3. 再生成（これが一番大事！）

```sh
npx prisma generate
```

# Next.jsにSupabase, Prisma(version7)初期設定手順

## ステップ1: 必要なパッケージをインストール

### Prisma関連 （prisma（CLI）: マイグレーション、スキーマ生成、Prisma Studioなど開発時のみ使用 → devDependencies

```sh
npm install prisma --save-dev
```

### Prisma関連 （@prisma/client: アプリケーションの実行時にデータベースへ接続するために必要 → dependencies

```sh
npm install prisma @prisma/client
```

### Supabase関連（「Supabase Client」 を使うためのライブラリ。prisma.user.findMany() のようにPrisma操作だけなら必要ない。※必要なケース：認証 (Auth)、ストレージ、リアルタイム機能

```sh
npm install @supabase/supabase-js @supabase/ssr
```

### PostgreSQLクライアント（PostgreSQLクライアント（開発用

```sh
npm install -D pg
```

## ステップ2: Supabaseの接続情報を取得

### .env

```sh
<!-- Direct Connection（マイグレーション時のみ使用）- IPv4アドレスに後で変更 -->
DIRECT_URL="postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT_REF].supabase.co:5432/postgres?sslmode=require"
<!-- Transaction Pooling（アプリケーション用） -->
DATABASE_URL="postgresql://postgres.[YOUR_PROJECT_REF]:[YOUR_PASSWORD]@[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

### .env.local

```sh
# Supabase API設定
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR_SERVICE_ROLE_KEY]

# データベース接続（.envと同じ）
DATABASE_URL="postgresql://postgres.[YOUR_PROJECT_REF]:[YOUR_PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

## Prismaを初期化

```sh
npx prisma init
```

## ステップ6: Prisma Schemaを設定

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  //url = env("DATABASE_URL") 接続URL設定は既にprisma.config.tsで管理されているためここでは設定しない
}

// 例: ユーザーモデル
model User {
  id              String   @id @default(uuid()) @db.Uuid
  clerkId         String   @unique
  email           String   @unique
}

```

## ステップ7: Supabaseクライアントを設定

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// サーバーサイド用のSupabaseクライアント
export const supabaseServer = createClient(supabaseUrl, supabaseAnonKey);

// クライアントサイド用のSupabaseクライアント（ブラウザ専用）
export function createSupabaseClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
```

## ステップ8: Prismaクライアントを設定

```typescript
// lib/prisma.tsを作成
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
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

## ステップ8: prisma.config.tsファイルを作成

```typescript
// prisma.config.ts
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // マイグレーション用は直接接続を使用（poolerではなくポート5432）
    url: process.env['DIRECT_URL'] || process.env['DATABASE_URL'],
  },
});
```

## ステップ9: package.jsonにスクリプトを追加

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && prisma migrate deploy && next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio"
  }
}
```

## ステップ10: データベースマイグレーション

```typescript
// 接続できるか確認：プロジェクトルートにtest-connection.jsを作成
// test-connection.js
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DIRECT_URL,
});

console.log('データベース接続テスト中...');

client.connect()
  .then(() => {
    console.log('✅ 接続成功！');
    return client.query('SELECT version()');
  })
  .then(result => {
    console.log('PostgreSQL:', result.rows[0].version);
    client.end();
    console.log('\n✅ 次のステップ: npm run db:push');
  })
  .catch(err => {
    console.error('❌ 接続失敗:', err.message);
    process.exit(1);
  });
//   テストコマンド
  node test-connection.js
```

10-2. マイグレーション実行

```sh
# Prismaクライアントを生成
npm run db:generate
```

```sh
# 初回マイグレーション
# 開発中であればdb:pushでも可
npm run db:migrate
```
