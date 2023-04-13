import React from 'react';
import { ITask } from '../../types/task';
import Button from '../Button';
import style from './Form.module.scss';

class Form extends React.Component<{
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}> {
  state = {
    task: "",
    time: "00:00"
  }

  addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.setTasks(oldTasks => [...oldTasks, { ...this.state }]);
  }

  render() {
    return (
      <form className={style.newTask} onSubmit={this.addTask.bind(this)}>
        <div className={style['inputContainer']}>  {/* forma de incluir um nome com carateres especiais (exemplo: -) */}
          <label htmlFor='task'>
            Add a new study focus
          </label>
          <input
            type='text'
            name='task'
            id='task'
            value={this.state.task}
            onChange={event => this.setState({ ...this.state, task: event.target.value })}
            placeholder='What do you wanna study?'
            required
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor='time'>
            Time
          </label>
          <input
            type='time'
            step='1'
            name='time'
            value={this.state.time}
            onChange={event => this.setState({ ...this.state, time: event.target.value })}
            id='time'
            min='00:00:00'
            max='01:30:00'
            required
          />
        </div>
        <Button type="submit">
          Add
        </Button>
      </form>
    )
  }
}

export default Form;
