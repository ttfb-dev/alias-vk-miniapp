import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

import { store } from '../store';

import { thresholds } from './thresholds';

const defaultReporter = ({ id, delta, entries, name, value }) => {
  const { title, error, warn, unit } = thresholds[name];

  if (value > error) {
    console.error(`Web Vitals Error: ${title} value is above ${error}${unit} (received ${value}${unit})`);
    store.dispatch.sync({
      type: 'analytics/send',
      event: 'app.web-vitals',
      userAgent: window.navigator.userAgent,
      data: { id, delta, entries, name, value },
    });
    return;
  }

  if (value > warn) {
    console.error(`Web Vitals Warning: ${title} value is above ${warn}${unit} (received ${value}${unit})`);
    store.dispatch.sync({
      type: 'analytics/send',
      event: 'app.web-vitals',
      userAgent: window.navigator.userAgent,
      data: { id, delta, entries, name, value },
    });
  }
};

const reportWebVitals = ({ reporter = defaultReporter }) => {
  getCLS(reporter);
  getFID(reporter);
  getFCP(reporter);
  getLCP(reporter);
  getTTFB(reporter);
};

export { reportWebVitals };
