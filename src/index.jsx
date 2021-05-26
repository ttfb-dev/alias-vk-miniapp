import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ClientContext } from '@logux/client/react';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';

import { app } from './services';
import { store, client } from './store';
import { App } from './views';
import { reportWebVitals } from './reportWebVitals';

app.init();

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <ClientContext.Provider value={client}>
        <Provider store={store}>
          <StrictMode>
            <App />
          </StrictMode>
        </Provider>
      </ClientContext.Provider>
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  import('./eruda').then(({ default: eruda }) => {
    window.eruda = eruda;
  });
}

if (process.env.NODE_ENV === 'production') {
  reportWebVitals();
}
