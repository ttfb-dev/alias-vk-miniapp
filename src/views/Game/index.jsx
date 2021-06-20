import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSubscription } from '@logux/redux';
import { View, Alert } from '@vkontakte/vkui';

import { general, room } from '../../store';

import { Lobby } from './Lobby';
import { Step } from './Step';

const Game = (props) => {
  const dispatch = useDispatch();
  const activePanel = useSelector((state) => state.general.game.activePanel);
  const isRoomLeaveAlert = useSelector((state) => state.general.isRoomLeaveAlert);
  const isGameEndAlert = useSelector((state) => state.general.isGameEndAlert);
  const roomId = useSelector((state) => state.room.roomId);
  const isSubscribing = useSubscription([`room/${roomId}/game`]);

  const onRoomLeave = useCallback(() => {
    dispatch.sync(room.action.leave());
  }, [dispatch]);

  const onGameEnd = useCallback(() => {
    dispatch.sync(room.action.gameEnd());
  }, [dispatch]);

  const onClose = useCallback(() => {
    dispatch(general.action.alert({ isRoomLeaveAlert: false, isGameEndAlert: false }));
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
          action: onRoomLeave,
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
          action: onGameEnd,
        },
      ]}
      actionsLayout='horizontal'
      onClose={onClose}
      header='Закончить игру'
      text='Вы уверены, что хотите закончить игру?'
    />
  );

  return (
    <View
      {...props}
      activePanel={activePanel}
      popout={(isRoomLeaveAlert && roomLeaveAlert) || (isGameEndAlert && gameEndAlert)}
    >
      <Lobby id='lobby' isSubscribing={isSubscribing} />

      <Step id='step' isSubscribing={isSubscribing} />
    </View>
  );
};

export { Game };
