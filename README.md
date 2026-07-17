# IELTS Writing App

黒猫コーチ「ナイチー」と一緒にIELTS Writing Task 1を練習するNext.jsアプリです。回答の保存、模範解答と解説の表示、できなかった問題の復習管理に対応しています。

## Local development

Node.js 22とpnpm 10を使用します。

```bash
cp .env.example .env.local
pnpm install
supabase start
pnpm db:deploy
pnpm dev
```

`.env.local`にはローカルSupabaseとGoogle OAuthの開発用認証情報を設定してください。秘密値をGitへコミットしないでください。

## Production environment variables

VercelのProject Settingsで次の値をProduction環境へ登録します。

| Variable             | Required | Purpose                                                          |
| -------------------- | -------- | ---------------------------------------------------------------- |
| `DATABASE_URL`       | Yes      | Supabase Transaction pooler URL used by the application          |
| `AUTH_SECRET`        | Yes      | Auth.js cookie and token encryption secret                       |
| `AUTH_GOOGLE_ID`     | Yes      | Google OAuth client ID                                           |
| `AUTH_GOOGLE_SECRET` | Yes      | Google OAuth client secret                                       |
| `AUTH_URL`           | No       | Stable production URL; Vercel is normally inferred automatically |

`DIRECT_URL`はアプリの実行環境ではなく、データベースマイグレーションに使用します。GitHub ActionsのRepository secretへ登録してください。

## Database deployment

1. Supabaseで本番Projectを作成する。
2. SupabaseのDirect connectionまたはSession pooler URLをGitHub Secretの`DIRECT_URL`へ登録する。
3. GitHub Actionsの`Deploy database migrations`を手動実行する。
4. マイグレーション成功後にVercelへデプロイする。

既存データベースへ初めてPrisma Migrateを導入する場合、この初期マイグレーションを直接実行せずbaselineが必要です。

## Google OAuth

Google Cloud Consoleの承認済みリダイレクトURIへ次を追加します。

```text
https://YOUR_PRODUCTION_DOMAIN/api/auth/callback/google
```

開発環境と本番環境は、可能であれば別のOAuthクライアントを使用してください。

## Verification

```bash
pnpm lint
pnpm build
```
