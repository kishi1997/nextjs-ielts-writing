'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function Home() {
  const [answer, setAnswer] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const sendAnswer = async (text: string) => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
      }),
    });
    const data = await res.json();
    console.log(data);
    setAiResponse(data.output);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl items-center justify-between px-16 py-32 sm:items-start dark:bg-black">
        <div className="flex w-[60%] flex-col gap-4">
          <div>
            <img src="./test.png" alt="test=image" width={300} height={600} />
          </div>
          <p>
            Describe the scene shown in the image below. You should write at
            least 150 words. Include details about the people, the place, and
            what is happening.
          </p>
        </div>
        <div className="w-[40%]">
          <Field>
            <FieldLabel htmlFor="textarea-message" className="text-white">
              Answer
            </FieldLabel>
            <FieldDescription>Enter your answer below.</FieldDescription>
            <Textarea
              id="textarea-message"
              placeholder="Type your answer here."
              name="message"
              rows={4}
              className="w-full border border-zinc-300 p-2 text-white dark:border-zinc-700"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </Field>
          <Button
            variant="outline"
            type="submit"
            className="mt-2 hover:cursor-pointer"
            onClick={() => sendAnswer(answer)}
          >
            Send
          </Button>
          <div className="mt-4 text-white">
            {aiResponse ? aiResponse : 'AIのreviewが表示されます'}
          </div>
        </div>
      </main>
    </div>
  );
}
