import { store } from '@/store';

const getAbsoluteTime = () => {
  return Date.now() - store.client.node.timeFix;
};

export { getAbsoluteTime };
