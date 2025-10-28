import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Widget } from '@/components/playground-new/types';
import { createWidget } from '@/components/playground-new/widgets/create-widget';

interface TimerProps {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
}

interface TimerWidget extends Widget<TimerProps, typeof Timer> {}

export function createTimerWidget() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  return createWidget<TimerWidget>(
    {
      time,
      setTime,
      isRunning,
      setIsRunning
    },
    Timer
  );
}

export function Timer({ time, setTime, isRunning, setIsRunning }: TimerProps) {
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className='flex flex-col items-center gap-4 p-4'>
      <div className='text-4xl font-bold'>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className='flex gap-2'>
        <button
          onClick={handleStartStop}
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className='rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600'
        >
          Reset
        </button>
      </div>
    </div>
  );
}
