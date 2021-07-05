import { badge, badgeRu, log } from '@logux/client';
import { badgeStyles } from '@logux/client/badge/styles';

import { webVitals } from '@/metrics';
import { PAGE_ONBOARDING, router } from '@/router';
import AppService from '@/services';
import { general, profile, room, store } from '@/store';

import { creds, env, misc } from './config';

(async () => {
  // app init
  await AppService.initApp();
  const isFinished = await AppService.isOnboardingFinished();

  // store init
  store.client.start();

  // router init
  router.start();

  if (creds.userId) {
    // если мы знаем айди, то сохраням его и запрашиваем сеты пользователя
    store.dispatch(general.action.setUserId({ userId: parseInt(creds.userId, 10) }));
    store.dispatch.sync(profile.action.getSets());
  }

  if (!isFinished) {
    // если онбординг не пройден, то редиректим туда
    router.replacePage(PAGE_ONBOARDING);
  } else {
    if (creds.userId && !misc.roomId) {
      // иначе если мы не знаем номер комнаты, то запрашиваем его
      store.dispatch.sync(room.action.whereIAm());
    } else if (creds.userId && misc.roomId) {
      // если номер комнаты известен, то сохраняем номер и делаем джоин к комнате
      store.dispatch(room.action.setRoomId({ roomId: misc.roomId }));
      store.dispatch.sync(room.action.join({ roomId: misc.roomId }));
    }
  }

  if (misc.tokenSettings?.includes('friends')) {
    // если у есть права на получение инфы о друзьях пользователя, то запрашиваем этот список
    const friends = await AppService.getFriendProfiles();
    store.dispatch(general.action.setFriends({ friends }));
  }
})();

// metrics init
webVitals();

if (env.isProd) {
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
