'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { submitIeltsAnswerTest } from '@/lib/api/api';
import { MIN_WORD_COUNT, IMAGE_PATH } from '@/lib/constants';
import { getWordCount } from '@/lib/word-count-utils';
import { useMemo, useState } from 'react';

export default function Home() {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const wordCount = useMemo(() => {
    return getWordCount(answer);
  }, [answer]);

  // 送信可能かどうか
  const canSubmit = wordCount >= MIN_WORD_COUNT;

  const sendAnswer = async (answer: string) => {
    if (!canSubmit) return;
    try {
      setLoading(true);
      setAiResponse('Thinking...');
      const res = await submitIeltsAnswerTest(answer, IMAGE_PATH);
      setAiResponse(res);
    } catch (error) {
      setAiResponse('Error occurred while fetching AI response.');
      console.error('Error submitting answer:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="flex w-[60%] flex-col gap-4">
        <p className="text-white">
          Describe the scene shown in the image below. You should write at least
          150 words. Include details about the people, the place, and what is
          happening.
        </p>
        <div>
          <img src={IMAGE_PATH} alt="test=image" width={300} height={600} />
        </div>
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
          <div className="text-xs text-white/40">
            現在の単語数：{wordCount}/{MIN_WORD_COUNT}
          </div>
        </Field>
        <Button
          variant="outline"
          type="submit"
          className="mt-4 hover:cursor-pointer disabled:cursor-not-allowed"
          disabled={!canSubmit}
          onClick={() => sendAnswer(answer)}
        >
          {loading ? 'Sending' : 'Send'}
        </Button>
        <div className="mt-4 text-white">{aiResponse ? aiResponse : ''}</div>
      </div>
    </div>
  );
}
