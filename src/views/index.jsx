import React from 'react';
import { useSelector } from 'react-redux';
import { AppRoot, Epic, Root } from '@vkontakte/vkui';

import { Main } from './Main';
import { Game } from './Game';

const App = () => {
  const activeView = useSelector((state) => state.general.activeView);

  return (
    <AppRoot>
      <Epic activeStory='main' tabbar>
        <Root id='main' activeView={activeView}>
          <Main id='main' />

          <Game id='game' />
        </Root>
      </Epic>
    </AppRoot>
  );
};

export { App };
