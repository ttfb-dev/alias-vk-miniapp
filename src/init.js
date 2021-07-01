import { badge, badgeRu, log } from '@logux/client';
import { badgeStyles } from '@logux/client/badge/styles';

import { webVitals } from '@/metrics';
import { router } from '@/router';
import AppService from '@/services';
import { general, profile, room, store } from '@/store';

import { creds, env, misc } from './config';

// app init
AppService.initApp();

// store init
store.client.start();
if (creds.userId) {
  store.dispatch(general.action.setUserId({ userId: parseInt(creds.userId, 10) }));
  store.dispatch.sync(profile.action.getSets());
}
if (creds.userId && !misc.roomId) {
  store.dispatch.sync(room.action.whereIAm());
} else if (creds.userId && misc.roomId) {
  store.dispatch(room.action.setRoomId({ roomId: misc.roomId }));
  store.dispatch.sync(room.action.join({ roomId: misc.roomId }));
}

// router init
router.start();
/* if (!AppService.isOnboardingFinished()) {
  router.replacePage(PAGE_ONBOARDING);
} */

// metrics init
webVitals();

if (env.isDev) {
  import('./eruda').then(({ default: eruda }) => {
    window.eruda = eruda;
  });

  window.sync = store.dispatch.sync;

  log(store.client);
  badge(store.client, {
    messages: badgeRu,
    styles: {
      ...badgeStyles,
    },
    position: 'top-center',
  });
}

if (env.isProd) {
  store.dispatch.sync({ type: 'analytics/send', event: 'app.open', userAgent: window.navigator.userAgent });
}
