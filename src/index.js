import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterContext } from '@happysanta/router';
import { ClientContext } from '@logux/client/react';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';

import { NotificationProvider } from '@/components';
import { router } from '@/router';
import { store } from '@/store';
import { App } from '@/views';

import './init';

import '@vkontakte/vkui/dist/vkui.css';

const appRoot = document.getElementById('root');
const notificationRoot = document.getElementById('notification-root');

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <RouterContext.Provider value={router}>
        <ClientContext.Provider value={store.client}>
          <NotificationProvider container={notificationRoot} delay={4000}>
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
