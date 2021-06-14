const thresholds = {
  LCP: {
    warn: 2500,
    error: 4000,
  },
  FID: {
    warn: 100,
    error: 300,
  },
  CLS: {
    warn: 0.1,
    error: 0.25,
  },
  FCP: {
    warn: 1800,
    error: 3000,
  },
  TTFB: {
    warn: 200,
    error: 400,
  },
};

export { thresholds };
