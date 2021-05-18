import { CrossTabClient } from '@logux/client';
import { createStoreCreator } from '@logux/redux';

import { reducer } from './reducer';

const client = new CrossTabClient({
  subprotocol: '1.0.0',
  server: 'wss://mythanks.ru:31337',
  userId: 'anonymous',
  token: '',
});

const createStore = createStoreCreator(client);

const store = createStore(reducer);

store.client.start();

export { store };
