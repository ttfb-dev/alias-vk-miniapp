import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { CrossTabClient, badge, badgeRu, log } from '@logux/client';
import { badgeStyles } from '@logux/client/badge/styles';
import { createStoreCreator } from '@logux/redux';
import bridge from '@vkontakte/vk-bridge';

import { general } from './general';
import { room } from './room';

// Init VK Mini App
bridge.send('VKWebAppInit').then((res, req) => {
  // eslint-disable-next-line
  console.log(res, req);
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('vk_user_id') ?? 0;

  // eslint-disable-next-line
  console.log(userId);
});

const client = new CrossTabClient({
  subprotocol: '1.0.0',
  server: 'wss://mythanks.ru:443',
  userId: '0',
  token: window.location.search.substring(1),
});

const createStore = createStoreCreator(client);
const store = createStore(combineReducers({ general: general.reducer, room: room.reducer }), applyMiddleware(thunk));

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
