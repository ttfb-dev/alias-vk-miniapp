import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ClientContext } from '@logux/client/react';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';

import { ViewProvider } from './context';
import { store, client } from './store';
import { App } from './views';
import { reportWebVitals } from './reportWebVitals';

import '@vkontakte/vkui/dist/vkui.css';

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <ClientContext.Provider value={client}>
        <Provider store={store}>
          <ViewProvider>
            <StrictMode>
              <App />
            </StrictMode>
          </ViewProvider>
        </Provider>
      </ClientContext.Provider>
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  import('./eruda').then(({ default: eruda }) => {});
}

if (process.env.NODE_ENV === 'production') {
  reportWebVitals();
}
