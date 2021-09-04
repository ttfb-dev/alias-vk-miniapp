import React, { useEffect } from 'react';
import { useLocation } from '@happysanta/router';
import { useClient } from '@logux/client/react';
import { AppRoot, Root } from '@vkontakte/vkui';

import { VIEW_GAME, VIEW_MAIN } from '@/app/router';
import { store } from '@/store';

import { Game } from './Game';
import { Main } from './Main';
import { Modal } from './Modal';

import './index.scss';

const PagesContainer = () => {
  const location = useLocation();

  const client = useClient();

  useEffect(() => {
    const onError = client.type(
      'logux/undo',
      (action) => {
        store.dispatch.sync({
          type: 'log/send',
          level: action.reason === 'error' ? 'critical' : 'error',
          data: { message: action.type, reason: action.reason, action: action.action },
        });
      },
      { event: 'add' },
    );
    return () => {
      onError();
    };
  });

  return (
    <AppRoot>
      <Root nav='app' activeView={location.getViewId()} modal={<Modal />}>
        <Main nav={VIEW_MAIN} />

        <Game nav={VIEW_GAME} />
      </Root>
    </AppRoot>
  );
};

export { PagesContainer };
