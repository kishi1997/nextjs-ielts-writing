'use client';
import { Button } from './ui/button';
import { Field, FieldLabel, FieldDescription } from './ui/field';
import { Textarea } from './ui/textarea';
import { Task } from '@/types/type';
import { getWordCount } from '@/lib/word-count-utils';
import { useMemo, useState, useSyncExternalStore } from 'react';
import { createEssay } from '@/lib/database/essay';
import {
  addReviewTaskId,
  getReviewTaskIds,
  getServerReviewTaskIds,
  removeReviewTaskId,
  subscribeReviewTaskIds,
} from '@/lib/review-tasks';
import {
  BookmarkPlus,
  CheckCircle2,
  Eye,
  HelpCircle,
  Save,
  Sparkles,
  Target,
} from 'lucide-react';
import Image from 'next/image';

interface PageProps {
  task: Task;
}
export const TaskClient = ({ task }: PageProps) => {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const reviewTaskIds = useSyncExternalStore(
    subscribeReviewTaskIds,
    getReviewTaskIds,
    getServerReviewTaskIds,
  );

  const wordCount = useMemo(() => {
    return getWordCount(answer);
  }, [answer]);

  const canSave = answer.trim().length > 0;
  const isInReview = reviewTaskIds.includes(task.id);

  const saveAnswer = async (answer: string, taskId: string) => {
    if (!canSave) return;
    try {
      setLoading(true);
      setMessage('');
      await createEssay(answer, taskId);
      setMessage('回答を保存しました。答えと解説を見て振り返れます。');
    } catch (error) {
      setMessage('保存に失敗しました。もう一度試してください。');
      console.error('Error submitting answer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDontKnow = () => {
    setShowModelAnswer(true);
    setShowExplanation(true);
    addReviewTaskId(task.id);
    setMessage('できなかった問題に追加しました。あとで復習できます。');
  };

  const handleAddReview = () => {
    addReviewTaskId(task.id);
    setMessage('できなかった問題に追加しました。');
  };

  const handleRemoveReview = () => {
    removeReviewTaskId(task.id);
    setMessage('復習リストから外しました。');
  };

  return (
    <div className="space-y-6">
      <section className="relative min-h-56 overflow-hidden border-y border-white/10 bg-[#0b0f14] shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <Image
          src="/images/black-cat-study-hero.png"
          alt="ナイチーの夜の書斎"
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,12,0.98)_0%,rgba(5,8,12,0.86)_45%,rgba(5,8,12,0.18)_78%)]" />
        <div className="relative z-10 flex min-h-56 max-w-2xl flex-col justify-center p-6 md:p-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-black text-[#8ee857]">
            <Target className="h-4 w-4" />
            ACTIVE QUEST
          </div>
          <h1 className="text-2xl font-black text-white md:text-3xl">
            {task.title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-white/65">
            {task.taskDescription}
          </p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <section className="space-y-5">
          <div className="rounded-lg border border-[#4dabf7]/20 bg-[#0b1118] p-4 shadow-[0_7px_0_#030405]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-xs font-black text-[#74c0fc]">
                QUESTION MAP
              </span>
              <span className="rounded-lg bg-white/[0.06] px-2 py-1 text-[10px] font-bold text-white/40">
                読み取り → 比較 → 要約
              </span>
            </div>
            <Image
              src={task.taskImagePath}
              alt={`${task.title}の問題資料`}
              width={720}
              height={520}
              className="max-h-[520px] w-full rounded-lg bg-white object-contain"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Button
              type="button"
              variant="outline"
              className="h-12 gap-2 border-[#ffd43b]/40 bg-[#ffd43b] font-black text-[#241c00] shadow-[0_5px_0_#8a6d00] hover:bg-[#ffe066] hover:text-[#241c00]"
              onClick={handleDontKnow}
            >
              <HelpCircle className="h-4 w-4" />
              わからない
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-12 gap-2 border-white/10 bg-white/[0.08] font-bold text-white hover:bg-white/[0.14] hover:text-white"
              onClick={() => setShowModelAnswer(true)}
            >
              <Eye className="h-4 w-4" />
              答えを見る
            </Button>
            {isInReview ? (
              <Button
                type="button"
                variant="outline"
                className="h-12 gap-2 border-[#58cc02]/40 bg-[#58cc02] font-black text-[#092100] shadow-[0_5px_0_#2c7100] hover:bg-[#7be338] hover:text-[#092100]"
                onClick={handleRemoveReview}
              >
                <CheckCircle2 className="h-4 w-4" />
                できるようになった
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="h-12 gap-2 border-[#4dabf7]/40 bg-[#4dabf7] font-black text-[#061827] shadow-[0_5px_0_#185780] hover:bg-[#74c0fc] hover:text-[#061827]"
                onClick={handleAddReview}
              >
                <BookmarkPlus className="h-4 w-4" />
                復習に追加
              </Button>
            )}
          </div>
        </section>

        <aside className="space-y-4">
          <section className="grid grid-cols-[68px_1fr] items-center gap-3 rounded-lg border border-[#ffd43b]/20 bg-[#151408] p-3">
            <div className="mascot-float relative h-16 w-16 overflow-hidden rounded-lg border border-[#ffd43b]/20">
              <Image
                src="/images/black-cat-mascot.png"
                alt="黒猫のナイチー"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-black text-[#ffd43b]">COACH TIP</p>
              <p className="mt-1 text-sm leading-5 text-white/65">
                最初から全文を書かなくて大丈夫。まずOverviewを一文だけ。
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-[#58cc02]/20 bg-[#0f1618] p-5 shadow-[0_8px_0_#05070a]">
            <Field>
              <FieldLabel
                htmlFor="textarea-message"
                className="text-base font-black text-white"
              >
                Your answer
              </FieldLabel>
              <FieldDescription className="text-white/50">
                まず自分の言葉で書いてみる
              </FieldDescription>
              <Textarea
                id="textarea-message"
                placeholder="Start with the overview, then choose the key details."
                name="message"
                rows={11}
                className="min-h-72 rounded-lg border-white/10 bg-[#070a0e] p-4 text-white placeholder:text-white/30 focus-visible:border-[#58cc02] focus-visible:ring-[#58cc02]/30"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white/45">
                  現在の単語数：{wordCount}/{task.minWordCount}
                </span>
                <span className="rounded bg-white/[0.08] px-2 py-1 text-white/45">
                  保存だけ・採点なし
                </span>
              </div>
            </Field>

            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
              <Button
                variant="outline"
                type="submit"
                className="h-12 gap-2 border-[#58cc02]/40 bg-[#58cc02] font-black text-[#092100] shadow-[0_5px_0_#2c7100] hover:bg-[#7be338] hover:text-[#092100] disabled:shadow-none"
                disabled={!canSave || loading}
                onClick={() => saveAnswer(answer, task.id)}
              >
                <Save className="h-4 w-4" />
                {loading ? 'Saving' : '回答を保存'}
              </Button>
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-white/50">
                <Sparkles className="h-4 w-4 text-[#ffd43b]" />
                {isInReview ? '復習中' : '通常練習'}
              </div>
            </div>
          </section>

          {message ? (
            <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-3 text-sm text-white/70">
              {message}
            </div>
          ) : null}

          {showModelAnswer ? (
            <section className="rounded-lg border border-[#4dabf7]/25 bg-[#071522] p-4">
              <h2 className="mb-2 text-lg font-black text-[#74c0fc]">
                模範解答
              </h2>
              <p className="text-sm leading-6 text-white/80">
                {task.modelAnswer}
              </p>
            </section>
          ) : null}

          {showExplanation ? (
            <section className="rounded-lg border border-[#ffd43b]/30 bg-[#171607] p-4">
              <h2 className="mb-2 text-lg font-black text-[#ffd43b]">解説</h2>
              <p className="text-sm leading-6 text-white/80">
                {task.explanation}
              </p>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
};
