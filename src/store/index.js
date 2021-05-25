import { combineReducers } from 'redux';
import { CrossTabClient, badge, badgeRu, log } from '@logux/client';
import { badgeStyles } from '@logux/client/badge/styles';
import { createStoreCreator } from '@logux/redux';

import { general } from './general';
import { room } from './room';

const params = new URLSearchParams(window.location.search);
const userId = params.get('vk_user_id') ?? '0';
const token = window.location.search.substring(1) ?? '';

const client = new CrossTabClient({
  subprotocol: '1.0.0',
  server: 'wss://mythanks.ru:443',
  userId: userId,
  token: token,
});

client.type(
  'logux/subscribe',
  (action, meta) => {
    if (action.channel === 'room/null') {
      client.log.add({ type: 'logux/undo', id: meta.id, action, reason: 'wrong subscribe' });
    }
  },
  { event: 'add' },
);

const createStore = createStoreCreator(client);
const store = createStore(combineReducers({ general: general.reducer, room: room.reducer }));

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

export { store, client, general, room };
