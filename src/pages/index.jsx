import React from 'react';
import { useLocation } from '@happysanta/router';
import { AppRoot, Root } from '@vkontakte/vkui';

import { VIEW_GAME, VIEW_MAIN } from '@/app/router';

import { Game } from './Game';
import { Main } from './Main';
import { Modal } from './Modal';

import './index.scss';

const PagesContainer = () => {
  const location = useLocation();

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
