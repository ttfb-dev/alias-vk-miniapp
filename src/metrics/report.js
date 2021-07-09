import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

import vkapi from '@/api';
import { creds } from '@/config';

const isProd = process.env.NODE_ENV === 'production';

let webVitals = ({ enabled = isProd } = {}) => {
  if (!enabled) {
    return;
  }

  let queue = new Set();
  let addToQueue = (data) => {
    let metric = {
      userId: creds.userId,
      ...data,
    };

    queue.add(metric);
  };

  let sendQueue = () => {
    if (queue.size > 0) {
      let body = JSON.stringify([...queue]);

      console.log(body); // eslint-disable-line

      navigator.sendBeacon('/metrics', body);

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
