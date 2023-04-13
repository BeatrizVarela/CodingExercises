import React, { useState } from 'react';
import Stopwatch from '../components/Stopwatch';
import Form from '../components/Form';
import List from '../components/List';
import style from './App.module.scss';
import { ITask } from '../types/task';

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  return (
    <div className={style.AppStyle}>
      <Form setTasks={setTasks} />
      <List tasks={tasks} />
      <Stopwatch />
    </div>
  );
}

export default App;
