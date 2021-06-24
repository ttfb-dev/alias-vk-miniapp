import React from 'react';
import { useSelector } from 'react-redux';
import { AppRoot, Epic, Root } from '@vkontakte/vkui';

import { Game } from './Game';
import { Main } from './Main';
import { Modal } from './Modal';

import './index.scss';

const App = () => {
  const activeView = useSelector((state) => state.general.activeView);

  return (
    <AppRoot>
      <Epic activeStory='main' tabbar>
        <Root id='main' activeView={activeView} modal={<Modal />}>
          <Main id='main' />

          <Game id='game' />
        </Root>
      </Epic>
    </AppRoot>
  );
};

export { App };
