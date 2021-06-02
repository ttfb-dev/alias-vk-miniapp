import React from 'react';
import { useSelector } from 'react-redux';
import { View } from '@vkontakte/vkui';

import { Lobby } from './Lobby';
import { Step } from './Step';

const Game = (props) => {
  const activePanel = useSelector((state) => state.general.game.activePanel);

  return (
    <View {...props} activePanel={activePanel}>
      <Lobby id='lobby' />

      <Step id='step' />
    </View>
  );
};

export { Game };
