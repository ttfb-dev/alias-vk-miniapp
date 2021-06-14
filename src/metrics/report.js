import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

import { store } from '../store';

import { thresholds } from './thresholds';

const defaultReporter = ({ id, delta, entries, name, value }) => {
  const { error, warn } = thresholds[name];

  if (value > error) {
    store.dispatch.sync({
      type: 'metrics/send',
      event: 'app.web-vitals',
      userAgent: window.navigator.userAgent,
      data: { id, delta, entries, name, value },
    });

    return;
  }

  if (value > warn) {
    store.dispatch.sync({
      type: 'metrics/send',
      event: 'app.web-vitals',
      userAgent: window.navigator.userAgent,
      data: { id, delta, entries, name, value },
    });
  }
};

const webVitals = ({ reporter = defaultReporter, enabled = process.env.NODE_ENV === 'production' } = {}) => {
  if (!enabled) {
    return;
  }

  getCLS(reporter);
  getFID(reporter);
  getFCP(reporter);
  getLCP(reporter);
  getTTFB(reporter);
};

export { webVitals };
