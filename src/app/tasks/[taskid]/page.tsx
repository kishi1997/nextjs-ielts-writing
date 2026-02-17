import { TaskClient } from '@/components/taskClient';
import { GetTaskById } from '@/lib/task-utils';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ taskid: string }>;
}
export default async function TaskDetailPage({ params }: PageProps) {
  const { taskid } = await params;
  const task = GetTaskById(taskid);
  if (task == null) {
    notFound();
  }
  return <TaskClient task={task} />;
}
