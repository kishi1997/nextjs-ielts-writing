'use client';
import { IMAGE_PATH, MIN_WORD_COUNT } from '@/lib/constants';
import { Button } from './ui/button';
import { Field, FieldLabel, FieldDescription } from './ui/field';
import { Textarea } from './ui/textarea';
import { Task } from '@/types/type';
import { submitIeltsAnswerTest } from '@/lib/api/api';
import { getWordCount } from '@/lib/word-count-utils';
import { useMemo, useState } from 'react';
import { createEssay } from '@/lib/database/essay';
import { useUserState } from '@/store/useUserStore';

interface PageProps {
  task: Task;
}
export const TaskClient = ({ task }: PageProps) => {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const user = useUserState((state) => state.user);

  const wordCount = useMemo(() => {
    return getWordCount(answer);
  }, [answer]);
  // 送信可能かどうか
  const canSubmit = wordCount >= MIN_WORD_COUNT;

  const sendAnswer = async (answer: string, taskId: string) => {
    if (!canSubmit) return;
    try {
      await createEssay(answer, taskId, user?.id);
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
        <h1>こんにちは、{user?.name}さん</h1>
        <p className="text-white">{task.taskDescription}</p>
        <div>
          <img
            src={task.taskImagePath}
            alt="test=image"
            width={300}
            height={600}
          />
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
            現在の単語数：{wordCount}/{task.minWordCount}
          </div>
        </Field>
        <Button
          variant="outline"
          type="submit"
          className="mt-4 hover:cursor-pointer disabled:cursor-not-allowed"
          disabled={!canSubmit}
          onClick={() => sendAnswer(answer, task.id)}
        >
          {loading ? 'Sending' : 'Send'}
        </Button>
        <div className="mt-4 text-white">{aiResponse ? aiResponse : ''}</div>
      </div>
    </div>
  );
};
