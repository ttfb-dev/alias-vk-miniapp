import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

import vkapi from '@/shared/api';
import { creds } from '@/shared/config';

import { thresholds } from './thresholds';

const isProd = process.env.NODE_ENV === 'production';

let webVitals = ({ enabled = isProd } = {}) => {
  if (!enabled) {
    return;
  }

  let queue = new Set();
  let addToQueue = ({ id, delta, entries, name, value }) => {
    let { error, warn } = thresholds[name];

    let event = value > error ? 'web-vitals.error' : value > warn ? 'web-vitals.warn' : null;

    if (event) {
      let metric = {
        event,
        userId: creds.userId,
        data: { id, delta, entries, name, value },
      };

      queue.add(metric);
    }
  };

  let sendQueue = () => {
    if (queue.size > 0) {
      let body = JSON.stringify([...queue]);

      navigator.sendBeacon('https://api.mythanks.ru/metrics', body);

      queue.clear();
    }
  };

  getCLS(addToQueue);
  getFID(addToQueue);
  getFCP(addToQueue);
  getLCP(addToQueue);
  getTTFB(addToQueue);

  vkapi.onViewHide(() => {
    sendQueue();
  });

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      sendQueue();
    }
  });
};

export { webVitals };
