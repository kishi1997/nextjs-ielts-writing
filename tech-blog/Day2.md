# IELTS Writing AI添削アプリ 開発ログ - Vol.2 Next.js App Router × AI SDK 実装メモ

## 1. フロントエンド ('use client')

- fetch でデータを送る時の定型パターン。

### ポイント:

- method: 'POST' を忘れない。
- body は必ず JSON.stringify で文字列化する。
- レスポンスも await res.json() でパースする。

```typeScript
// 送信処理（最小構成）
const handleSubmit = async () => {
  const res = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ text: inputState }), // 📦 荷造り
  });
  const data = await res.json(); // 📦 荷解き
  setResponse(data.output);
};
```

## 2. バックエンド (/api/chat/route.ts)

- リクエストを受け取り、JSONで返す定型パターン。

### ポイント:

- req.json() でデータを取り出す（これも非同期 await）。
- 返す時は NextResponse.json() でオブジェクトを包む。

```typeScript
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // 📥 フロントから受け取る
  const { text } = await req.json();

  // ... (ここでAI処理など) ...

  // 📤 フロントへ返す
  return NextResponse.json({ output: '完了' });
}
```

## 3. Vercel AI SDK (generateText)

- ストリーミングせず、単発で回答をもらうパターン。

### ポイント:

- streamText ではなく generateText を使う。
- 戻り値のオブジェクトから .text プロパティを取り出すだけでOK。

```typeScript
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

// AI呼び出し（最小構成）
const { text } = await generateText({
model: google('gemini-1.5-flash'),
system: 'あなたはIELTS試験官です。', // 役割
prompt: userText, // ユーザーの入力
});
```
