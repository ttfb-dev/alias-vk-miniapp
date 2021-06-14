const thresholds = {
  LCP: {
    title: 'Largest Contentful Paint',
    warn: 2500,
    error: 4000,
    unit: 'ms',
  },
  FID: {
    title: 'First Input Delay',
    warn: 100,
    error: 300,
    unit: 'ms',
  },
  CLS: {
    title: 'Cumalative Layout Shift',
    warn: 0.1,
    error: 0.25,
    unit: '',
  },
  FCP: {
    title: 'First Contentful Paint',
    warn: 1800,
    error: 3000,
    unit: 'ms',
  },
  TTFB: {
    title: 'Time To First Byte',
    warn: 200,
    error: 400,
    unit: 'ms',
  },
};

export { thresholds };
