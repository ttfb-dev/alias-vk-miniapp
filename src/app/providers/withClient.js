import { ClientContext } from '@logux/client/react';

import { store } from '@/store';

export const withClient = (component) => (
  <ClientContext.Provider value={store.client}>{component}</ClientContext.Provider>
);
