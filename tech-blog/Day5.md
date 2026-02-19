# 開発環境 Supabase 構築手順

公式の Supabase CLI を利用することで、Docker コンテナ上に
ローカル開発用のデータベース環境を簡単に構築できます。

## ① Supabase CLI のインストール

Homebrew を使用して CLI をインストールします。

```
brew install supabase/tap/supabase
```

## ② Supabase の初期セットアップ

プロジェクトのルートディレクトリで以下を実行します。

```
supabase init
```

途中で表示される質問にはどちらも **N** を選択します。

```
Generate VS Code settings for Deno? [y/N] N
Generate IntelliJ Settings for Deno? [y/N] N
```

セットアップ完了後、Supabase の設定ファイルが作成されます。

## ③ ローカル Supabase の起動

Docker コンテナを起動します。

```
supabase start
```

起動後、ログに表示される Studio URL にアクセスすると、
ローカル環境で Supabase が起動していることを確認できます。

## ④ コンテナの停止方法

Supabase を停止する場合は以下を実行します。

```
npx supabase stop
```

## ⑤ ローカル DB 接続へ変更（.env 修正）

この時点では、開発環境のデータベースにはまだテーブルが存在しません。

`prisma/schema.prisma` に定義したモデルを反映させるため、
`.env` の接続先を本番環境からローカル環境へ変更します。

`supabase start` のログから以下の DB URL を確認してください。

```
postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

.env を以下のように修正します。

```
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
DIRECT_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
```

これにより、DB の接続先が本番環境からローカル開発環境へ切り替わります。

## ⑥ Prisma マイグレーションの実行

接続先を変更したら以下を実行します。

```
npx prisma migrate dev
```

`schema.prisma` に定義したモデルがローカル Supabase データベースへ反映され、
テーブルが作成されます。

## 完了

以上でローカル開発用 Supabase データベース環境の構築は完了です。
