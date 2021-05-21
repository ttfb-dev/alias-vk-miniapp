import { CrossTabClient, badge, badgeRu, log } from '@logux/client';
import { badgeStyles } from '@logux/client/badge/styles';
import { createStoreCreator } from '@logux/redux';

import { reducer } from './reducer';

const params = new URLSearchParams(window.location.search);
const userId = params.get('vk_user_id') ?? 0;

const client = new CrossTabClient({
  subprotocol: '1.0.0',
  server: 'wss://mythanks.ru:443',
  userId: String(userId),
  token: window.location.search.substring(1),
});

const createStore = createStoreCreator(client);
const store = createStore(reducer);

if (process.env.NODE_ENV === 'development') {
  log(store.client);
  badge(store.client, {
    messages: badgeRu,
    styles: {
      ...badgeStyles,
    },
    position: 'top-center',
  });
}

store.client.start();

export { store };
