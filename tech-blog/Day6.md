# Prisma公式のAuth.js (with Next.js)参考にローカル環境でのAuth.jsを使ったログイン機能実装とログイン時にSupabaseのDBにユーザーデータを保存する方法

## 難しかったポイント

ログイン時にプロバイダーのログイン画面まではいけるが、その後にエラーが出ていた。
原因はPrismaアダプターの部分で、ここがミスるとsupabaseのDBにユーザーデータが保存されないため、ログイン後のリダイレクト先でユーザーデータが見つからずエラーになる。
根本的な解決には至っていない。

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
  runtime = "vercel-edge"
}
```

generator clientのコードは Wasm (Edge Runtime) 用の Client でローカル環境（Node.js環境）で npx supabase start や pnpm next dev を動かしている場合、通常の Node.js 用のランタイムが必要ですが、このファイルは「エッジ（Cloudflare WorkersやVercel Edge Functionsなど）」で動かすための特殊な制限がかかったクライアントを生成しています。
これが原因で、Auth.js（NextAuth）が期待している標準的な PrismaClient と型が合わず、最初に出ていた TypeScript のエラーや AdapterError を引き起こしていた。
ひとまずprovider = "prisma-client-js"に変更して、ローカル環境での開発を続けることにした。

## ① Install and configure Prisma

Homebrew を使用して CLI をインストールします。

```sh
pnpm add prisma tsx @types/pg --save-dev
pnpm add @prisma/client @prisma/adapter-pg dotenv pg
```

## ② Once installed, initialize Prisma in your project:

```sh
pnpm dlx prisma init --db --output ../app/generated/prisma
```

##　Define your Prisma Schema in `prisma/schema.prisma`:

```sh
// ここはローカル環境だとnode-ja環境のためエラー出るので現状は provider = "prisma-client-js"に変更
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
  runtime  = "vercel-edge"
}

datasource db {
  provider = "postgresql"
}
```

## ③ schema.prismaにAuth.jsで標準で定義されているUserモデルを追加

```prisma

model Account {
  id                String  @id @default(cuid())
  userId            String  @map("user_id")
  type              String
  provider          String
  providerAccountId String  @map("provider_account_id")
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
  @@map("accounts")
}
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique @map("session_token")
  userId       String   @map("user_id")
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@map("sessions")
}
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime? @map("email_verified")
  image         String?
  accounts      Account[]
  sessions      Session[]
  @@map("users")
}
model VerificationToken {
  identifier String
  token      String
  expires    DateTime
  @@unique([identifier, token])
  @@map("verification_tokens")
}
```

## ④ Configure the Prisma Client generator

```sh
pnpm dlx prisma migrate dev --name init
pnpm dlx prisma generate
```

## ⑤ Create a Prisma Client

```ts
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
export default prisma;
```

## ⑥ Set up Auth.js credentials

```sh
pnpm add @auth/prisma-adapter next-auth@beta
```

## 使用するプロバイダーのクレデンシャルを設定（client-idとか）

後は前回行ったprismaとsupabaseのセットアップで完了済み

### 参考サイト

https://www.prisma.io/docs/guides/authentication/authjs/nextjs
