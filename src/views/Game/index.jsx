import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useClient } from '@logux/client/react';
import { useSubscription } from '@logux/redux';
import { View } from '@vkontakte/vkui';

import { general, game } from '../../store';

import { Lobby } from './Lobby';
import { Step } from './Step';

const Game = (props) => {
  const client = useClient();
  const dispatch = useDispatch();
  const activePanel = useSelector((state) => state.general.game.activePanel);
  const roomId = useSelector((state) => state.room.roomId);
  const isSubscribing = useSubscription([`room/${roomId}/game`]);

  useEffect(() => {
    const gameState = client.type(
      'game/state',
      (action) => {
        if (action.game.status === 'step') {
          dispatch(general.action.route({ activeView: 'game', game: { activePanel: 'step' } }));
        } else if (action.game.status === 'lobby') {
          dispatch(general.action.route({ activeView: 'game', game: { activePanel: 'lobby' } }));
        }
      },
      { event: 'add' },
    );

    const stepStart = client.type(
      game.action.stepStart.type,
      () => {
        dispatch(general.action.route({ activeView: 'game', game: { activePanel: 'step' } }));
      },
      { event: 'add' },
    );

    const stepEnd = client.type(
      game.action.stepEnd.type,
      () => {
        dispatch(general.action.route({ activeView: 'game', game: { activePanel: 'lobby' } }));
      },
      { event: 'add' },
    );

    return () => {
      gameState();
      stepStart();
      stepEnd();
    };
  }, [client, dispatch]);

  return (
    <View {...props} activePanel={activePanel}>
      <Lobby id='lobby' isSubscribing={isSubscribing} />

      <Step id='step' isSubscribing={isSubscribing} />
    </View>
  );
};

export { Game };
