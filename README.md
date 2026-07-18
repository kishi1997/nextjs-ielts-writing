# IELTS Writing App

黒猫コーチ「ナイチー」と一緒にIELTS Writing Task 1を練習するNext.jsアプリです。Cloudflare Workersで動作し、認証情報と回答はCloudflare D1へ保存します。

## Architecture

- Application: Next.js + OpenNext on Cloudflare Workers
- Database: Cloudflare D1 (`ielts-writing`)
- Authentication: Auth.js + Google OAuth + D1 Adapter
- CI: GitHub Actionsでlint・型・Workers buildを検証
- CD: Cloudflare Workers Buildsが`main`をD1 migration後に自動デプロイ

## Local development

Node.js 22、pnpm 10、Wrangler 4を使用します。

```bash
cp .env.example .env.local
cp .dev.vars.example .dev.vars
pnpm install
pnpm db:migrate
pnpm dev
```

`next dev`でもOpenNextがローカルD1 bindingを提供します。Workers runtimeまで含めて確認する場合は次を実行します。

```bash
pnpm preview
```

## Cloudflare resources

`wrangler.jsonc`には次の構成を登録済みです。

- Worker: `ielts-writing-app`
- D1 database: `ielts-writing`
- D1 binding: `DB`
- Region: APAC
- Worker CPU limit: Freeプラン既定の10 ms per request
- Observability: disabled

この構成はCloudflare Workers Freeプランでの運用を前提にしています。有料プランへ変更せず、R2・Workers AI・Hyperdriveなどの従量課金サービスも追加しません。FreeプランのCPU上限はCloudflare側で自動適用され、上限超過時に処理が停止して超過料金は発生しません。Cloudflare Dashboardでプランを変更する場合は、課金条件を別途確認してください。

本番のAuth.js秘密値はCloudflare Workerへ登録します。

```bash
pnpm wrangler secret put AUTH_SECRET
pnpm wrangler secret put AUTH_GOOGLE_ID
pnpm wrangler secret put AUTH_GOOGLE_SECRET
```

公開URLは秘密値ではないため、`wrangler.jsonc`の`AUTH_URL`へ登録しています。

## Database migrations

```bash
# Local D1
pnpm db:migrate

# Production D1
pnpm db:deploy
```

D1 migrationは`migrations/`で管理します。PrismaやPostgreSQL接続URLは使用しません。

## Cloudflare Builds

Cloudflare DashboardのWorkers & Pagesから`ielts-writing-app`にGitHubリポジトリを接続します。

- Production branch: `main`
- Build command: `pnpm cf:build`
- Deploy command: `pnpm run deploy`
- Builds for non-production branches: disabled

`pnpm run deploy`は、D1 migrationを適用してからOpenNext Workerをデプロイします。アプリの秘密値・DB・デプロイ履歴はCloudflare Dashboardで一括管理します。無料枠のビルド時間を節約するため、非本番ブランチの自動ビルドは有効にしません。Workers Buildsを設定するときもFreeプランのまま進め、有料プランへのアップグレード確認には同意しないでください。

## Google OAuth

Google Cloud Consoleの承認済みリダイレクトURIへWorkersの本番URLを追加します。

```text
https://YOUR_WORKER_DOMAIN/api/auth/callback/google
```

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm cf:build
```
