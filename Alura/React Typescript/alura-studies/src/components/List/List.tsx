import React from 'react';

import { ITask } from '../../types/task';

import Item from './Item/Item';
import style from './List.module.scss';

interface ListProps {
  tasks: ITask[],
  selectTask: (selectedTask: ITask) => void
}

export default function List({ tasks, selectTask }: ListProps) {
  return (
    <aside className={style.tasksList}>
      <h2>Today's Studies</h2>
      <ul>
        {tasks.map((item) => (
          <Item
            selectTask={selectTask}
            key={item.id}
            {...item}
          />
        ))}
      </ul>
    </aside>
  )
}
