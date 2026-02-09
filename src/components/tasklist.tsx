import { TASK_LIST } from '@/resource';
import { Task } from '@/types/type';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { InboxIcon } from 'lucide-react';
import Link from 'next/link';

export const Tasklist = () => {
  return (
    <div className="flex w-full flex-wrap gap-6">
      {TASK_LIST.map((task: Task) => {
        return (
          <Link className="w-[30%]" href={`/tasks/${task.id}`} key={task.id}>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <InboxIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{task.title}</ItemTitle>
                <ItemDescription>{task.title}</ItemDescription>
              </ItemContent>
            </Item>
          </Link>
        );
      })}
    </div>
  );
};

export default Tasklist;
