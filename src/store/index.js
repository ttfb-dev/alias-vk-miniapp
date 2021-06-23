import { badge, badgeRu, CrossTabClient, log } from '@logux/client';
import { badgeStyles } from '@logux/client/badge/styles';
import { createStoreCreator } from '@logux/redux';
import { combineReducers } from 'redux';

import { queryStringParse } from '@/helpers';

import { game } from './game';
import { general } from './general';
import { profile } from './profile';
import { room } from './room';

const isDev = process.env.NODE_ENV === 'development';

const hashParams = queryStringParse(window.location.hash);
const searchParams = queryStringParse(window.location.search);

const roomId = parseInt(hashParams.roomId, 10);
const userId = searchParams.vk_user_id || (isDev && process.env.REACT_APP_VK_USER_ID) || '0';
const token = window.location.search.substring(1) ?? '';

const client = new CrossTabClient({
  subprotocol: '1.0.0',
  server: 'wss://mythanks.ru:443',
  userId,
  token,
});

const createStore = createStoreCreator(client);
const store = createStore(
  combineReducers({ game: game.reducer, general: general.reducer, profile: profile.reducer, room: room.reducer }),
);

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
if (userId) {
  store.dispatch(general.action.setUserId({ userId: parseInt(userId, 10) }));
  store.dispatch.sync(profile.action.getSets());
}
if (userId && !roomId) {
  store.dispatch.sync(room.action.whereIAm());
} else if (userId && roomId) {
  store.dispatch(room.action.setRoomId({ roomId }));
  store.dispatch.sync(room.action.join({ roomId }));
}

export { game, general, profile, room, store };
