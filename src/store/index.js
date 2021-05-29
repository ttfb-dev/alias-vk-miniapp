import { combineReducers } from 'redux';
import { CrossTabClient, badge, badgeRu, log } from '@logux/client';
import { badgeStyles } from '@logux/client/badge/styles';
import { createStoreCreator } from '@logux/redux';

import { general } from './general';
import { profile } from './profile';
import { room } from './room';

const isDev = process.env.NODE_ENV === 'development';

const params = new URLSearchParams(window.location.search);
const userId = params.get('vk_user_id') || (isDev && process.env.REACT_APP_VK_USER_ID) || '0';
const token = window.location.search.substring(1) ?? '';

const client = new CrossTabClient({
  subprotocol: '1.0.0',
  server: 'wss://mythanks.ru:443',
  userId,
  token,
});

client.type(
  'logux/subscribe',
  (action, meta) => {
    if (action.channel === 'room/null') {
      client.log.changeMeta(meta.id, { reasons: [] });
    }
  },
  { event: 'preadd' },
);

const createStore = createStoreCreator(client);
const store = createStore(combineReducers({ general: general.reducer, profile: profile.reducer, room: room.reducer }));

if (isDev) {
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

export { store, general, profile, room };
