import { useEffect, useState } from 'react';

import { store } from '@/store';

const timeDiff = ({ initTime, round }) => {
  const timeFix = store.client.node.timeFix;
  const fixedTime = Date.now() + timeFix;
  const diff = (fixedTime - initTime) / 1000;
  const time = diff > 0 ? Math.floor(diff) : Math.ceil(diff);
  const timeLeft = round - Math.abs(time);

  return timeLeft;
};

const useTimer = ({ initTime, round = 60, interval = 1000 }) => {
  const [status, setStatus] = useState('INITIAL');
  const [time, setTime] = useState();

  useEffect(() => {
    const timeLeft = timeDiff({ initTime, round });

    if (!initTime || timeLeft > round) {
      setStatus('STOPPED');
      setTime(0);
    } else {
      setStatus('RUNNING');
      setTime(timeLeft);
    }
  }, [initTime, round]);

  useEffect(() => {
    if (status !== 'STOPPED' && time <= 0) {
      setStatus('STOPPED');
      setTime(0);
    }
  }, [time, status]);

  useEffect(() => {
    let intervalId = null;

    if (status === 'RUNNING') {
      intervalId = setInterval(() => {
        const timeLeft = timeDiff({ initTime, round });

        setTime(timeLeft);
      }, interval);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [status, interval, time, initTime, round]);

  return { time, status };
};

export { useTimer };
