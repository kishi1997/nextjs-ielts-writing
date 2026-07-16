import { TASK_LIST } from '@/resource';
import { Task } from '@/types/type';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import {
  ArrowRight,
  BarChart3,
  LineChart,
  PieChart,
  Timer,
} from 'lucide-react';
import Link from 'next/link';

const lessonStyles = [
  {
    icon: BarChart3,
    accent: 'bg-[#58cc02] text-[#092100]',
    border: 'border-[#58cc02]/40 hover:border-[#58cc02]/70',
    glow: 'bg-[#58cc02]/12',
    label: 'Charts',
  },
  {
    icon: LineChart,
    accent: 'bg-[#4dabf7] text-[#061827]',
    border: 'border-[#4dabf7]/40 hover:border-[#4dabf7]/70',
    glow: 'bg-[#4dabf7]/12',
    label: 'Trends',
  },
  {
    icon: PieChart,
    accent: 'bg-[#ffd43b] text-[#241c00]',
    border: 'border-[#ffd43b]/40 hover:border-[#ffd43b]/70',
    glow: 'bg-[#ffd43b]/12',
    label: 'Compare',
  },
  {
    icon: Timer,
    accent: 'bg-[#ff6b6b] text-[#260707]',
    border: 'border-[#ff6b6b]/40 hover:border-[#ff6b6b]/70',
    glow: 'bg-[#ff6b6b]/12',
    label: 'Review',
  },
];

export const Tasklist = () => {
  return (
    <section className="relative">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black text-[#58cc02]">LESSON TRAIL</p>
          <h2 className="text-2xl font-black md:text-3xl">今夜のクエスト</h2>
        </div>
        <p className="text-sm text-white/45">1つ選んで書き始める</p>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {TASK_LIST.map((task: Task, index) => {
          const style = lessonStyles[index % lessonStyles.length];
          const Icon = style.icon;

          return (
            <Link href={`/tasks/${task.id}`} key={task.id} className="group">
              <Item
                variant="outline"
                className={`relative min-h-52 items-start overflow-hidden bg-[#0f151d] p-4 shadow-[0_8px_0_#030405] transition group-hover:-translate-y-1 group-hover:bg-[#131c26] ${style.border}`}
              >
                <div
                  className={`absolute -top-10 -right-10 h-28 w-28 rotate-12 rounded-lg ${style.glow}`}
                />
                <ItemMedia
                  variant="icon"
                  className={`relative h-12 w-12 rounded-lg border-0 shadow-[0_4px_0_rgba(0,0,0,0.35)] ${style.accent}`}
                >
                  <Icon className="h-5 w-5" />
                </ItemMedia>
                <ItemContent className="relative gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-black text-white/45">
                      QUEST {String(index + 1).padStart(2, '0')} · {style.label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-white/[0.35] transition group-hover:translate-x-1 group-hover:text-white" />
                  </div>
                  <ItemTitle className="text-lg font-black text-white">
                    {task.title}
                  </ItemTitle>
                  <ItemDescription className="text-white/55">
                    {task.taskDescription}
                  </ItemDescription>
                  <div className="mt-auto flex items-center gap-2 pt-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded bg-white/[0.08]">
                      <div className={`h-full w-0 rounded ${style.accent}`} />
                    </div>
                    <span className="text-[10px] font-black text-white/35">
                      NEW
                    </span>
                  </div>
                </ItemContent>
              </Item>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Tasklist;
