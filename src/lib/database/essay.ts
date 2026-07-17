'use server';
import { auth } from '@/lib/auth';
import { getDatabase } from '@/lib/db';
import { GetTaskById } from '@/lib/task-utils';

export const createEssay = async (answer: string, taskId: string) => {
  const session = await auth();
  const userId = session?.user?.id;
  const content = answer.trim();

  if (!userId) {
    throw new Error('回答を保存するにはログインが必要です。');
  }

  if (!content || !GetTaskById(taskId)) {
    throw new Error('回答と問題IDは必須です。');
  }

  return getDatabase()
    .prepare(
      `INSERT INTO essays (id, taskId, content, createdAt, userId)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .bind(
      crypto.randomUUID(),
      taskId,
      content,
      new Date().toISOString(),
      userId,
    )
    .run();
};
