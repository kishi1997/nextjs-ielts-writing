import { TASK_LIST } from '@/resource';
import { Task } from '@/types/type';

export const GetTaskById = (id: string): Task | undefined => {
  return TASK_LIST.find((task: Task) => task.id === id);
};
