import { Provider } from 'react-redux';

import { store } from '@/store';

export const withStore = (component) => <Provider store={store}>{component()}</Provider>;
