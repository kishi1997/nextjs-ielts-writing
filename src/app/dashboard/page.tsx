import { SignOut } from '@/components/auth-buttons';
import ReviewTaskList from '@/components/review-task-list';
import Tasklist from '@/components/tasklist';
import { Flame, Gem, MoonStar, Sparkles, Star, Target } from 'lucide-react';
import Image from 'next/image';

const page = () => {
  return (
    <div className="space-y-10">
      <section className="relative min-h-[390px] overflow-hidden border-y border-white/10 bg-[#0b0f14] shadow-[0_12px_45px_rgba(0,0,0,0.38)]">
        <Image
          src="/images/black-cat-study-hero.png"
          alt="星空の書斎で英語を勉強する黒猫"
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover object-[68%_center] md:object-center"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,12,0.98)_0%,rgba(5,8,12,0.9)_38%,rgba(5,8,12,0.22)_72%,rgba(5,8,12,0.08)_100%)]" />
        <div className="relative z-10 flex min-h-[390px] max-w-2xl flex-col justify-center p-6 md:p-10">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-lg border border-[#ffd43b]/25 bg-[#171607]/85 px-3 py-2 text-xs font-black text-[#ffd43b] backdrop-blur">
            <MoonStar className="h-4 w-4" />
            TONIGHT&apos;S WRITING QUEST
          </div>
          <h1 className="max-w-xl text-3xl leading-tight font-black text-white md:text-5xl">
            書けなかった夜ほど、
            <span className="text-[#8ee857]">強くなる。</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/68 md:text-base">
            ナイチーと一緒に、まず一文。迷った問題は印をつけて、できるようになるまで迎えにいこう。
          </p>
          <a
            href="#lessons"
            className="mt-6 inline-flex h-12 w-fit items-center gap-2 rounded-lg bg-[#58cc02] px-5 font-black text-[#092100] shadow-[0_6px_0_#2c7100] transition hover:-translate-y-0.5 hover:bg-[#7be338]"
          >
            <Sparkles className="h-5 w-5" />
            クエストを始める
          </a>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-[#ff6b6b]/25 bg-[#1c0e10] p-4 shadow-[0_5px_0_#05070a]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-black text-[#ff8787]">
              NIGHT STREAK
            </span>
            <Flame className="h-5 w-5 text-[#ff6b6b]" />
          </div>
          <p className="text-2xl font-black">1 night</p>
          <p className="mt-1 text-xs text-white/45">今日の一文からスタート</p>
        </div>
        <div className="rounded-lg border border-[#4dabf7]/25 bg-[#071522] p-4 shadow-[0_5px_0_#05070a]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-black text-[#74c0fc]">
              LESSON MAP
            </span>
            <Target className="h-5 w-5 text-[#4dabf7]" />
          </div>
          <p className="text-2xl font-black">4 quests</p>
          <p className="mt-1 text-xs text-white/45">Task 1 practice set</p>
        </div>
        <div className="rounded-lg border border-[#ffd43b]/25 bg-[#191606] p-4 shadow-[0_5px_0_#05070a]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-black text-[#ffd43b]">STAR DUST</span>
            <Gem className="h-5 w-5 text-[#ffd43b]" />
          </div>
          <p className="text-2xl font-black">0 gems</p>
          <p className="mt-1 text-xs text-white/45">復習を終えると獲得</p>
        </div>
      </section>

      <section className="grid items-center gap-5 border-y border-white/[0.08] bg-[#0c1117]/80 px-5 py-6 md:grid-cols-[110px_1fr_auto] md:px-7">
        <div className="mascot-float relative mx-auto h-24 w-24 overflow-hidden rounded-lg border border-[#ffd43b]/25 shadow-[0_6px_0_#030405]">
          <Image
            src="/images/black-cat-mascot.png"
            alt="黒猫のナイチー"
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-black text-[#ffd43b]">
            <Star className="star-pulse h-4 w-4 fill-current" />
            ナイチーからのヒント
          </div>
          <p className="text-lg font-black text-white md:text-xl">
            完璧な答えより、比べられる自分の答えを一つ残そう。
          </p>
          <p className="mt-2 text-sm leading-6 text-white/50">
            わからなければ解説を開いて復習リストへ。次に書けたら星を回収。
          </p>
        </div>
        <div className="hidden rounded-lg border border-[#58cc02]/25 bg-[#58cc02]/10 px-4 py-3 text-center md:block">
          <p className="text-xs font-bold text-white/45">NEXT REWARD</p>
          <p className="mt-1 font-black text-[#8ee857]">First Sentence</p>
        </div>
      </section>

      <div id="lessons" className="scroll-mt-24">
        <Tasklist />
      </div>
      <ReviewTaskList />
      <div className="border-t border-white/[0.08] pt-6">
        <SignOut />
      </div>
    </div>
  );
};

export default page;
