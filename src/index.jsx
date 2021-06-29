import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterContext } from '@happysanta/router';
import { ClientContext } from '@logux/client/react';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';

import { NotificationProvider } from '@/components';
import { webVitals } from '@/metrics';
import { router } from '@/router';
import AppService from '@/services';
import { general, store } from '@/store';
import { App } from '@/views';

import '@vkontakte/vkui/dist/vkui.css';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const appRoot = document.getElementById('root');
const notificationRoot = document.getElementById('notification-root');

AppService.initApp();
AppService.getFriendProfiles()
  .then((friends) => {
    store.dispatch(general.action.setFriends({ friends }));
  })
  .catch(AppService.onGetFriendProfilesError);

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <RouterContext.Provider value={router}>
        <ClientContext.Provider value={store.client}>
          <NotificationProvider container={notificationRoot} delay={3000}>
            <Provider store={store}>
              <StrictMode>
                <App />
              </StrictMode>
            </Provider>
          </NotificationProvider>
        </ClientContext.Provider>
      </RouterContext.Provider>
    </AdaptivityProvider>
  </ConfigProvider>,
  appRoot,
);

if (isDev) {
  import('./eruda').then(({ default: eruda }) => {
    window.eruda = eruda;
  });

  window.sync = store.dispatch.sync;
}

if (isProd) {
  store.dispatch.sync({ type: 'analytics/send', event: 'app.open', userAgent: window.navigator.userAgent });
}

webVitals();
