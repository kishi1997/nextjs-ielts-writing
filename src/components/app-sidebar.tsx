import * as React from 'react';
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
  // アプリのバージョン管理用
  versions: ['1.0.0', 'Beta'],

  navMain: [
    {
      title: 'Practice Mode',
      url: '#',
      items: [
        {
          title: 'TASK LIST',
          url: '/',
          isActive: true, // 現在開発中のページをアクティブに
        },
        {
          title: 'Writing Task 2', // 将来用
          url: '/practice/writing-task-2',
        },
      ],
    },
    {
      title: 'My Progress',
      url: '#',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
        },
        {
          title: 'History', // 過去の添削履歴
          url: '/history',
        },
        {
          title: 'Saved Vocabulary', // 覚えたい単語帳
          url: '/vocabulary',
        },
      ],
    },
    {
      title: 'Resources',
      url: '#',
      items: [
        {
          title: 'Band Descriptors', // 採点基準表
          url: '/resources/rubric',
        },
        {
          title: 'Model Answers', // 模範解答集
          url: '/resources/model-answers',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      items: [
        {
          title: 'General',
          url: '/settings',
        },
        {
          title: 'API Configuration', // APIキー設定など
          url: '/settings/api',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
