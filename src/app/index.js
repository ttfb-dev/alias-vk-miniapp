import { Provider } from 'react-redux';
import { RouterContext } from '@happysanta/router';
import { ClientContext } from '@logux/client/react';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';

import { Pages } from '@/pages';
import { store } from '@/store';

import './init';

import { router } from './router';

import 'react-toastify/dist/ReactToastify.min.css';
import '@vkontakte/vkui/dist/vkui.css';
import './index.css';

const App = () => (
  <RouterContext.Provider value={router}>
    <ConfigProvider>
      <AdaptivityProvider>
        <ClientContext.Provider value={store.client}>
          <Provider store={store}>
            <Pages />
          </Provider>
        </ClientContext.Provider>
      </AdaptivityProvider>
    </ConfigProvider>
  </RouterContext.Provider>
);

export default App;
