import { useEffect, useState } from "react";
import React from "react";

import { timeToSeconds } from "../../common/utils/time";
import { ITask } from "../../types/task";
import Button from "../Button";

import Clock from "./Clock";
import style from "./Stopwatch.module.scss";

interface Props {
  selected: ITask | undefined;
  endingTask: () => void;
}

export default function Stopwatch({ selected, endingTask }: Props) {
  const [time, setTime] = useState<number>();

  useEffect(() => {
    if (selected?.time) {
      setTime(timeToSeconds(selected.time));
    }
  }, [selected]);

  //stopwatch's countdown
  function countdown(counter = 0) {
    setTimeout(() => {
      if (counter > 0) {
        setTime(counter - 1);
        return countdown(counter - 1);
      }
      endingTask();
    }, 1000);
  }

  return (
    <>
      <div className={style.stopwatch}>
        <p className={style.title}>Chose a card and start the stopwatch:</p>
        <div className={style.clockWrapper}>
          <Clock time={time} />
        </div>
        <Button onClick={() => countdown(time)}>Start!</Button>
      </div>
    </>
  );
}
