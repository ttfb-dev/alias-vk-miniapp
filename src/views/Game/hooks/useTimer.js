import { useEffect, useState, useRef } from 'react';

const useTimer = ({ initTime, round = 60, interval = 1000 }) => {
  const timestamp = useRef(Date.now());
  const [status, setStatus] = useState('INITIAL');
  const [time, setTime] = useState();

  useEffect(() => {
    const diff = (timestamp.current - initTime) / 1000;
    const time = diff > 0 ? Math.floor(diff) : Math.ceil(diff);
    const endTime = round - Math.abs(time);

    if (initTime === null || Number.isNaN(initTime) || endTime > round) {
      setStatus('STOPPED');
      setTime(0);
    } else {
      setStatus('RUNNING');
      setTime(endTime);
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
        const timeLeft = round - (Date.now() - initTime) / 1000;
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
