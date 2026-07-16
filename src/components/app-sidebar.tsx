import * as React from 'react';
import {
  BookOpenCheck,
  House,
  RotateCcw,
  Sparkles,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

export const data = {
  navMain: [
    {
      title: 'Tonight',
      url: '#',
      items: [
        {
          title: 'Quest Home',
          url: '/dashboard',
          isActive: true,
          icon: House,
        },
        {
          title: 'Lesson Trail',
          url: '/dashboard#lessons',
          icon: BookOpenCheck,
        },
        {
          title: 'Review List',
          url: '/dashboard#review',
          icon: RotateCcw,
        },
      ],
    },
    {
      title: 'My Room',
      url: '#',
      items: [
        {
          title: 'Profile',
          url: '/profile',
          icon: UserRound,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent className="border-r border-white/[0.08] bg-[#080b10]/95 px-3 py-4 backdrop-blur-xl">
        <div className="mb-5 flex items-center gap-3 rounded-lg border border-[#ffd43b]/20 bg-[#12130f] p-3 shadow-[0_5px_0_#030405]">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[#ffd43b]/30">
            <Image
              src="/images/black-cat-mascot.png"
              alt="黒猫のナイチー"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-black text-white">Writing Quest</p>
            <p className="text-xs font-bold text-[#8ee857]">with ナイチー</p>
          </div>
        </div>

        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="px-2 text-[11px] font-bold tracking-wide text-white/[0.35] uppercase">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a
                        href={item.url}
                        className="gap-3 rounded-lg text-white/65 transition hover:bg-white/[0.07] hover:text-white data-[active=true]:bg-[#58cc02] data-[active=true]:font-black data-[active=true]:text-[#092100] data-[active=true]:shadow-[0_4px_0_#2c7100]"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <div className="mt-auto rounded-lg border border-[#4dabf7]/20 bg-[#071522] p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-black text-[#74c0fc]">
            <Sparkles className="h-4 w-4" />
            COACH NOTE
          </div>
          <p className="text-xs leading-5 text-white/60">
            迷った問題ほど、次に伸びる場所。印をつけて戻ってこよう。
          </p>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
