import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.json();
  const systemPrompt = `
    あなたはIELTSの試験官です。
    ユーザーから送られた画像（Task 1の問題）と、その回答を採点・添削してください。
    100字以内で、スコア目安（0-9）と改善点を具体的に教えてください。
  `;
  const result = await generateText({
    model: google('gemini-2.5-flash-lite'),
    system: systemPrompt,
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
