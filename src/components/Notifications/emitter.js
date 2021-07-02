import { createNanoEvents } from 'nanoevents';

export const events = {
  SHOW: 'show',
  HIDE: 'hide',
  HIDE_ALL: 'hideAll',
};

export const emitter = createNanoEvents();
