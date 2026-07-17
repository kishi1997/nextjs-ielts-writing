import { SignIn } from '@/components/auth-buttons';
import { auth } from '@/lib/auth';
import { BookOpenCheck, MoonStar, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <section
      data-login-page
      className="relative min-h-screen overflow-hidden bg-[#090d12] shadow-[0_14px_50px_rgba(0,0,0,0.4)]"
    >
      <Image
        src="/images/black-cat-study-hero.png"
        alt="夜の書斎で英語を学ぶ黒猫"
        fill
        sizes="100vw"
        className="object-cover object-[67%_center] md:object-center"
        priority
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,12,0.99)_0%,rgba(5,8,12,0.94)_38%,rgba(5,8,12,0.28)_72%,rgba(5,8,12,0.12)_100%)]" />

      <div className="relative z-10 flex min-h-screen max-w-2xl flex-col justify-center p-7 md:p-12 lg:ml-[6vw]">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#58cc02] text-[#092100] shadow-[0_5px_0_#2c7100]">
            <BookOpenCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-black text-white">Writing Quest</p>
            <p className="text-xs font-bold text-[#8ee857]">with ナイチー</p>
          </div>
        </div>

        <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-lg border border-[#ffd43b]/25 bg-[#171607]/80 px-3 py-2 text-xs font-black text-[#ffd43b] backdrop-blur">
          <MoonStar className="h-4 w-4" />
          YOUR NIGHTLY WRITING ADVENTURE
        </div>
        <h1 className="max-w-xl text-4xl leading-tight font-black text-white md:text-6xl">
          書けないを、
          <br />
          <span className="text-[#8ee857]">次の得意</span>に変える夜。
        </h1>
        <p className="mt-5 max-w-lg text-sm leading-7 text-white/65 md:text-base">
          答えを見て終わりにしない。ナイチーと問題を預けて、できるようになるまで少しずつ取り戻そう。
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-xs font-bold text-white/65 backdrop-blur">
            <Sparkles className="h-4 w-4 text-[#4dabf7]" />
            4つのTask 1クエスト
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-xs font-bold text-white/65 backdrop-blur">
            <Star className="h-4 w-4 text-[#ffd43b]" />
            復習リストで再挑戦
          </span>
        </div>

        <div className="mt-8 flex">
          <SignIn />
        </div>
      </div>
    </section>
  );
};

export default page;
