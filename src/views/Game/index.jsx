import React from 'react';
import { useSelector } from 'react-redux';
import { useSubscription } from '@logux/redux';
import { View } from '@vkontakte/vkui';

import { Lobby } from './Lobby';
import { Step } from './Step';

const Game = (props) => {
  const activePanel = useSelector((state) => state.general.game.activePanel);
  const roomId = useSelector((state) => state.room.roomId);
  const isSubscribing = useSubscription([`room/${roomId}/game`]);

  return (
    <View {...props} activePanel={activePanel}>
      <Lobby id='lobby' isSubscribing={isSubscribing} />

      <Step id='step' isSubscribing={isSubscribing} />
    </View>
  );
};

export { Game };
