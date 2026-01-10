## create-repo-from-terminal

# login to GitHub CLI

```
gh auth login
```

# create a new repository and push the local code

```
gh repo create your-repo-name --public --source=. --remote=origin --push
```

# IELTS Writing AI添削アプリ 開発ログ - Vol.1

## 1. プロジェクトの目的

IELTSライティング Task 1 の学習効率を上げるため、作成した回答をAIが即座に採点・添削してくれるWebアプリを開発する。

## 2. 技術スタック選定

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn UI
- **AI Integration:** Vercel AI SDK (Google Gemini API)
- **Tooling:** Prettier, ESLint, Husky, lint-staged

## 3. 実装ステップ

### Phase 1: AI連携機能のプロトタイプ (Core)

UIを作り込む前に、まずは「AIと会話できる最小構成」を作成。

**Backend (`app/api/chat/route.ts`):**
Vercel AI SDKの `streamText` を使用し、Google Gemini (`gemini-1.5-flash`) からのレスポンスをストリーミング形式でフロントエンドに返すAPIを実装。

**Frontend (`app/page.tsx`):**
`useChat` フックを使用し、入力フォームとチャット履歴の表示を実装。Shadcn UIの `Textarea` と `Button` を採用して見た目を整備。

### Phase 2: 品質管理ツールの導入 (DX向上)

チーム開発や実務を見据え、コードフォーマットの自動化環境を構築。

**1. Prettier & Tailwind Plugin**

- `.prettierrc` を作成し、標準的なルール（singleQuote, tabWidth: 2など）を設定。
- `prettier-plugin-tailwindcss` を導入し、クラス名の並び順を自動統一。

**2. ESLint (Flat Config) 対応**
Next.js v15系のため `eslint.config.mjs` を使用。
`eslint-config-prettier` を導入し、Prettierと競合するESLintルールを無効化する設定を `defineConfig` の配列末尾に追加。

**3. Git Hooks (Husky & lint-staged)**
コミット時に強制的にLintとFormatを走らせる仕組みを導入。

- **Husky:** Gitフックの管理。
- **lint-staged:** ステージングされたファイル（変更分）のみを対象に `prettier --write` と `next lint` を実行。
  これにより、エディタの設定に依存せず、リポジトリ内のコード品質を一定に保つ環境が完成。

## 4. 次のステップ

- IELTS Task 1 用の画面レイアウト実装（左右分割UI）
- 固定データ（問題画像）の表示
- Docker化と Cloud Run へのデプロイ
