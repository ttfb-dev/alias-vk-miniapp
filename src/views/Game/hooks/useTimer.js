import { useEffect, useState } from 'react';

const useTimer = (initialTime, interval = 1000) => {
  const [status, setStatus] = useState('INITIAL');
  const [time, setTime] = useState();

  useEffect(() => {
    if (initialTime === null || Number.isNaN(initialTime)) {
      setStatus('STOPPED');
      setTime(0);
    } else {
      setStatus('RUNNING');
      setTime(initialTime);
    }
  }, [initialTime]);

  useEffect(() => {
    if (status !== 'STOPPED' && time === 0) {
      setStatus('STOPPED');
      setTime(0);
    }
  }, [time, status, initialTime]);

  useEffect(() => {
    let intervalId = null;

    if (status === 'RUNNING') {
      intervalId = setInterval(() => {
        setTime(time - 1);
      }, interval);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [status, interval, time]);

  return { time, status };
};

export { useTimer };
