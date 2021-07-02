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
  <RouterContext.Provider value={router}>
    <ConfigProvider>
      <AdaptivityProvider>
        <ClientContext.Provider value={store.client}>
          <NotificationProvider container={notificationRoot}>
            <Provider store={store}>
              <StrictMode>
                <App />
              </StrictMode>
            </Provider>
          </NotificationProvider>
        </ClientContext.Provider>
      </AdaptivityProvider>
    </ConfigProvider>
  </RouterContext.Provider>,
  appRoot,
);
