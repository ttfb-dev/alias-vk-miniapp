import { CrossTabClient } from '@logux/client';
import { createStoreCreator } from '@logux/redux';
import { combineReducers } from 'redux';

import { creds } from '../config';

import { game } from './game';
import { general } from './general';
import { profile } from './profile';
import { room } from './room';

const client = new CrossTabClient({
  subprotocol: '1.0.0',
  server: 'wss://mythanks.ru:443',
  userId: creds.userId,
  token: creds.token,
});

const createStore = createStoreCreator(client);
const store = createStore(
  combineReducers({ game: game.reducer, general: general.reducer, profile: profile.reducer, room: room.reducer }),
);

export { game, general, profile, room, store };
