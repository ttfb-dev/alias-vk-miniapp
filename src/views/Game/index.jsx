import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useClient } from '@logux/client/react';
import { useSubscription } from '@logux/redux';
import { View, Alert } from '@vkontakte/vkui';

import { general, game, room } from '../../store';

import { Lobby } from './Lobby';
import { Step } from './Step';

const Game = (props) => {
  const client = useClient();
  const dispatch = useDispatch();
  const activePanel = useSelector((state) => state.general.game.activePanel);
  const isRoomLeave = useSelector((state) => state.general.isRoomLeave);
  const isGameEnd = useSelector((state) => state.general.isGameEnd);
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

  const onExit = useCallback(() => {
    dispatch.sync(room.action.leave());

    dispatch(general.action.route({ activeView: 'main', main: { activePanel: 'home' } }));
  }, [dispatch]);

  const onClose = useCallback(() => {
    dispatch(general.action.alert({ isRoomLeave: false }));
  }, [dispatch]);

  const roomLeaveAlert = (
    <Alert
      actions={[
        {
          title: 'Отмена',
          autoclose: true,
          mode: 'cancel',
        },
        {
          title: 'Выйти',
          autoclose: true,
          mode: 'destructive',
          action: onExit,
        },
      ]}
      actionsLayout='horizontal'
      onClose={onClose}
      header='Выход из игры'
      text='Вы уверены, что хотите выйти из игры и покинуть комнату?'
    />
  );

  const gameEndAlert = (
    <Alert
      actions={[
        {
          title: 'Отмена',
          autoclose: true,
          mode: 'cancel',
        },
        {
          title: 'Закончить',
          autoclose: true,
          mode: 'destructive',
          action: onExit,
        },
      ]}
      actionsLayout='horizontal'
      onClose={onClose}
      header='Закончить игру'
      text='Вы уверены, что хотите закончить игру?'
    />
  );

  return (
    <View {...props} activePanel={activePanel} popout={(isRoomLeave && roomLeaveAlert) || (isGameEnd && gameEndAlert)}>
      <Lobby id='lobby' isSubscribing={isSubscribing} />

      <Step id='step' isSubscribing={isSubscribing} />
    </View>
  );
};

export { Game };
