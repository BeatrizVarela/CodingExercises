import { useState } from 'react';
import { timeToSeconds } from '../../common/utils/time';
import { ITask } from '../../types/task';
import Button from '../Button';
import Clock from './Clock';
import style from './Stopwatch.module.scss'

interface Props {
  selected: ITask | undefined
}

export default function Stopwatch({ selected }: Props) {
  const [time, setTime] = useState<number>();
  if(selected?.time) {
    setTime(timeToSeconds(selected?.time));
  }
  return (
    <>
      <div className={style.stopwatch}>
        <p className={style.title}>Chose a card and start the stopwatch:</p>
        Time: {time}
        <div className={style.clockWrapper}>
          <Clock />
        </div>
        <Button>
          Start!
        </Button>
      </div>
    </>
  )
}