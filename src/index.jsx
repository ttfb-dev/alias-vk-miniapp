import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';

import { ViewProvider } from './context';
import { store } from './store';
import { App } from './views';
import { reportWebVitals } from './reportWebVitals';

import '@vkontakte/vkui/dist/vkui.css';

// Init VK Mini App
bridge.send('VKWebAppInit');

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <Provider store={store}>
        <ViewProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </ViewProvider>
      </Provider>
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  import('./eruda').then(({ default: eruda }) => {});
}

if (process.env.NODE_ENV === 'production') {
  reportWebVitals();
}
