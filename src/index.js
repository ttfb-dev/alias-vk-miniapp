import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { RouterContext } from '@happysanta/router';
import { ClientContext } from '@logux/client/react';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';

import { router } from '@/router';
import { store } from '@/store';
import { App } from '@/views';

import './init';

import 'react-toastify/dist/ReactToastify.min.css';
import '@vkontakte/vkui/dist/vkui.css';
import './index.css';

const appRoot = document.getElementById('root');

ReactDOM.render(
  <RouterContext.Provider value={router}>
    <ConfigProvider>
      <AdaptivityProvider>
        <ClientContext.Provider value={store.client}>
          <Provider store={store}>
            <StrictMode>
              <App />
              <ToastContainer
                position={toast.POSITION.TOP_CENTER}
                draggablePercent={50}
                draggableDirection='y'
                limit={3}
                hideProgressBar={true}
                newestOnTop={true}
                closeButton={false}
              />
            </StrictMode>
          </Provider>
        </ClientContext.Provider>
      </AdaptivityProvider>
    </ConfigProvider>
  </RouterContext.Provider>,
  appRoot,
);
