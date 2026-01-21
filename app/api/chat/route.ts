import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.json();
  const systemPrompt = `
    あなたはIELTSの試験官です。
    以下の問題に対するユーザーの回答を200字以内で添削してください。

    【問題文】
      Describe the scene shown in the image below. You should write at least 150 words. Include details about the people, the place, and what is happening.
  【ユーザーの回答】
  ${body.text}
  `;
  const { text } = await generateText({
    model: google('gemini-2.5-flash-lite'),
    prompt: systemPrompt,
  });
  return NextResponse.json({ output: text });
}
