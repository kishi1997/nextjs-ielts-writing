## Commit command

```bash
git add .
git commit -m "feat: -- your message"
git push -u origin main
```

## Change commit message that already pushed

```bash
git commit --amend -m "new message"
git push -f origin HEAD
```

## データベースとPrismaのセットアップ

### Prisma本体（開発用）とクライアント（本番用）をインストール

npm install prisma --save-dev
npm install @prisma/client

### Prismaの初期化

npx prisma init

### Supabase上の本物のデータベースにスキーマを適用するコマンド

npx prisma migrate dev --name init
