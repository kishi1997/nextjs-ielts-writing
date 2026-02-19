'use server';
import { prisma } from '@/lib/prisma';

export const createEssay = async (answer: string, taskId: string) => {
  try {
    await prisma.essay.create({
      data: {
        taskId: taskId,
        content: answer,
      },
    });
  } catch (error) {
    console.error('Error submitting answer to database:', error);
  }
};
