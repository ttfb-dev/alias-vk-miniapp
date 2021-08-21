import { toast } from 'react-toastify';
import { badge, badgeRu, log } from '@logux/client';
import { badgeStyles } from '@logux/client/badge/styles';

import { creds, env, misc } from '@/shared/config';
import App from '@/shared/services';
import { Notification } from '@/shared/ui';
import { general, profile, room, store } from '@/store';

import { webVitals } from './metrics';
import { PAGE_ONBOARDING, router } from './router';

// store init
store.client.start();

// router init
router.start();

if (creds.userId) {
  // если мы знаем айди, то сохраням его и запрашиваем сеты пользователя
  store.dispatch(general.action.setUserId({ userId: parseInt(creds.userId, 10) }));
  store.dispatch.sync(profile.action.getSets());
}

(async () => {
  // app init
  await App.init();

  const isFinished = await App.isOnboardingFinished();

  if (!isFinished) {
    // если онбординг не пройден, то редиректим туда
    router.replacePage(PAGE_ONBOARDING);
  }

  if (creds.userId && !misc.roomId) {
    // если мы не знаем номер комнаты, то запрашиваем его
    store.dispatch.sync(room.action.whereIAm());
  } else if (creds.userId && misc.roomId) {
    // если номер комнаты известен, то сохраняем номер
    store.dispatch.sync(room.action.whereIAm()).then(() => {
      const state = store.getState();
      if (state.room.roomId && state.room.roomId !== misc.roomId) {
        toast.error(
          <Notification message='Не удалось присоединиться. Вы уже находитесь в другой комнате' type='error' />,
        );
        return;
      }
      if (state.room.roomId !== misc.roomId) {
        store.dispatch.sync(room.action.join({ roomId: misc.roomId }));
      }
    });
  }

  if (misc.tokenSettings?.includes('friends')) {
    // если у приложения есть права на получение инфы о друзьях пользователя, то запрашиваем этот список
    const friends = await App.getFriendProfiles();
    store.dispatch(general.action.setFriends({ friends }));
  }

  await App.registerRestoreCallback();
})();

// metrics init
webVitals();
if (env.isDev || env.isDevUser) {
  import('./eruda').then(({ default: eruda }) => {
    window.eruda = eruda;
  });
}
if (env.isDev) {
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
