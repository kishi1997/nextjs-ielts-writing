import { IMAGE_PATH } from './lib/constants';
import { Task } from './types/type';

export const TASK_LIST: Task[] = [
  {
    id: 'task-1',
    title: 'General Writing Mock',
    taskImagePath: IMAGE_PATH,
    minWordCount: 200,
    taskDescription: '',
    // 今後追加：ジャンルのアイコン画像パス
    // genle: "",
  },
  {
    id: 'task-2',
    title: 'General Writing Mock2',
    taskImagePath: IMAGE_PATH,
    minWordCount: 200,
    taskDescription: '',
  },
  {
    id: 'task-3',
    title: 'General Writing Mock3',
    taskImagePath: IMAGE_PATH,
    minWordCount: 200,
    taskDescription: '',
  },
  {
    id: 'task-4',
    title: 'General Writing Mock4',
    taskImagePath: IMAGE_PATH,
    minWordCount: 200,
    taskDescription: '',
  },
];
