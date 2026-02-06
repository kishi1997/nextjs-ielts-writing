# IELTS Writing AI添削アプリ 開発ログ - Vol.3

## 1. 今回の実施内容

問題文の画像をbase64に変換してAIに送信するようにした。
また、アプリケーションの設計を見直し、コードの保守性とパフォーマンスを向上させるためのリファクタリングを実施。
具体的には、**「ロジックの分離」** を行った。

## 2. 技術的な変更点

### ① APIロジックの分離 (Separation of Concerns)

UIコンポーネント（`page.tsx`）内にベタ書きされていた `fetch` 処理やデータ変換ロジックを、専用の関数として切り出した。

- **Before:** `page.tsx` 内で `fetch` を直接コールし、エラーハンドリングも混在。
- **After:** `lib/api.ts` を作成し、`submitIeltsAnswer` 関数を定義。コンポーネント側はこれを呼ぶだけのシンプルな構成になった。

## 3. 重要なコードスニペット (Server-side Image Reading)

Next.js (App Router) のAPI側で、プロジェクト内の静的ファイルを読み込んでGeminiに渡す実装。

```typescript
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export async function POST(req: Request) {
  const body = await req.json();

  // 3. AI SDKに渡す
  const result = await generateText({
    model: google('gemini-2.5-flash-lite'),
    system: '...',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: body.text },
          { type: 'image', image: body.image },
        ],
      },
    ],
  });

  return NextResponse.json({ output: result.text });
}
```

## 今後行いたい実装

### 画像処理のパフォーマンス最適化

固定画像（`public/test.png`）をAIに送信するプロセスを最適化

- **課題:**
  これまではクライアント側で画像を `fetch` し、Base64に変換してからAPIに送信していた。
  これでは「サーバーにある画像をわざわざクライアントに落とし、またサーバーに送り返す」という無駄な通信が発生していた。

- **解決策:**
  API Route (`api/chat/route.ts`) 側で、Node.jsの標準モジュール `fs` (File System) を使って画像を直接読み込む方式に変更。

```typescript
// 1. サーバー内部のファイルパスを取得
// process.cwd() はプロジェクトルートを指す
const filePath = path.join(process.cwd(), 'public', 'test.png');

// 2. ファイルを読み込んでBase64文字列に変換
const fileBuffer = fs.readFileSync(filePath);
const base64Image = fileBuffer.toString('base64');
```
