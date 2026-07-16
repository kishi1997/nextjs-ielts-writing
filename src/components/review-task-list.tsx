'use client';

import Link from 'next/link';
import { RotateCcw, CheckCircle2, ArrowRight } from 'lucide-react';
import { TASK_LIST } from '@/resource';
import { Task } from '@/types/type';
import { Button } from './ui/button';
import {
  getReviewTaskIds,
  getServerReviewTaskIds,
  removeReviewTaskId,
  subscribeReviewTaskIds,
} from '@/lib/review-tasks';
import { useMemo, useSyncExternalStore } from 'react';
import Image from 'next/image';

export const ReviewTaskList = () => {
  const reviewTaskIds = useSyncExternalStore(
    subscribeReviewTaskIds,
    getReviewTaskIds,
    getServerReviewTaskIds,
  );

  const reviewTasks = useMemo(() => {
    return TASK_LIST.filter((task: Task) => reviewTaskIds.includes(task.id));
  }, [reviewTaskIds]);

  return (
    <section id="review" className="w-full scroll-mt-24">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm font-bold text-[#ffd43b]">
            <RotateCcw className="h-4 w-4" />
            REVIEW
          </div>
          <h2 className="text-2xl font-black">できなかった問題</h2>
        </div>
        <p className="text-sm text-white/45">できるようになったら外す</p>
      </div>

      {reviewTasks.length === 0 ? (
        <div className="grid items-center gap-5 rounded-lg border border-dashed border-[#ffd43b]/20 bg-[#11130d] p-5 sm:grid-cols-[84px_1fr_auto]">
          <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-[#ffd43b]/20">
            <Image
              src="/images/black-cat-mascot.png"
              alt="復習を待つナイチー"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-black text-white">復習リストは空です</p>
            <p className="mt-1 text-sm leading-6 text-white/50">
              わからない問題を見つけたら、ナイチーがここで預かります。
            </p>
          </div>
          <span className="rounded-lg bg-[#ffd43b]/10 px-3 py-2 text-xs font-black text-[#ffd43b]">
            ALL CLEAR
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {reviewTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-[#ffd43b]/30 bg-[#171607] p-4 shadow-[0_6px_0_#05070a]"
            >
              <Link href={`/tasks/${task.id}`} className="group min-w-0 flex-1">
                <p className="flex items-center gap-2 font-black">
                  {task.title}
                  <ArrowRight className="h-4 w-4 text-white/30 transition group-hover:translate-x-1 group-hover:text-[#ffd43b]" />
                </p>
                <p className="mt-1 truncate text-sm text-white/55">
                  {task.taskDescription}
                </p>
              </Link>
              <Button
                type="button"
                variant="outline"
                className="shrink-0 border-[#58cc02]/40 bg-[#58cc02] font-bold text-[#092100] hover:bg-[#7be338] hover:text-[#092100]"
                onClick={() => removeReviewTaskId(task.id)}
              >
                <CheckCircle2 className="h-4 w-4" />
                できるようになった
              </Button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewTaskList;
