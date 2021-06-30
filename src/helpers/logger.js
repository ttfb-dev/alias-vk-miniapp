import { store } from '@/store';

const logger = {
  debug: async (message, data) => {
    await store.dispatch.sync({ type: 'log/send', level: 'debug', data: { message, ...data } });
  },
};

export default logger;
