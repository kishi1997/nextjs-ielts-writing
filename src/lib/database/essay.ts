'use server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const createEssay = async (answer: string, taskId: string) => {
  const session = await auth();
  const userId = session?.user?.id;
  const content = answer.trim();

  if (!userId) {
    throw new Error('回答を保存するにはログインが必要です。');
  }

  if (!content || !taskId) {
    throw new Error('回答と問題IDは必須です。');
  }

  return prisma.essay.create({
    data: {
      taskId,
      content,
      userId,
    },
  });
};
