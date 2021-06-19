import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parseId } from '@logux/core';
import { track } from '@logux/client';
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
  const isRoomLeaveAlert = useSelector((state) => state.general.isRoomLeaveAlert);
  const isGameEndAlert = useSelector((state) => state.general.isGameEndAlert);
  const userId = useSelector((state) => state.general.userId);
  const roomId = useSelector((state) => state.room.roomId);
  const isSubscribing = useSubscription([`room/${roomId}/game`]);

  const onRoute = useCallback((route) => dispatch(general.action.route(route)), [dispatch]);

  useEffect(() => {
    const gameState = client.type(
      'game/state',
      (action) => {
        if (action.game.status === 'step') {
          onRoute({ activeView: 'game', game: { activePanel: 'step' } });
        } else if (action.game.status === 'lobby') {
          onRoute({ activeView: 'game', game: { activePanel: 'lobby' } });
        }
      },
      { event: 'add' },
    );

    const stepStart = client.type(
      game.action.stepStart.type,
      () => {
        onRoute({ activeView: 'game', game: { activePanel: 'step' } });
      },
      { event: 'add' },
    );

    const stepEnd = client.type(
      game.action.stepEnd.type,
      () => {
        onRoute({ activeView: 'game', game: { activePanel: 'lobby' } });
      },
      { event: 'add' },
    );

    const gameEnd = client.type(
      room.action.gameEnd.type,
      (_, meta) => {
        const { userId: parsedUserId } = parseId(meta.id);
        const actionUserId = parseInt(parsedUserId, 10);

        // редиректить в комнату только через resend, у инициатора экшена другое флоу перехода в комнату
        if (actionUserId !== userId) {
          onRoute({ activeView: 'main', main: { activePanel: 'room' }, activeModal: 'game-results' });
        } else {
          // у инициатора редирект происходит после перехода экшена в состояние processed
          track(client, meta.id).then(() => {
            onRoute({ activeView: 'main', main: { activePanel: 'room' }, activeModal: 'game-results' });
          });
        }
      },
      { event: 'add' },
    );

    return () => {
      gameState();
      stepStart();
      stepEnd();
      gameEnd();
    };
  }, [client, onRoute, userId]);

  const onRoomLeave = useCallback(() => {
    dispatch.sync(room.action.leave());

    dispatch(general.action.route({ activeView: 'main', main: { activePanel: 'home' } }));
  }, [dispatch]);

  const onGameEnd = useCallback(() => {
    dispatch.sync(room.action.leave());

    dispatch(general.action.route({ activeView: 'main', main: { activePanel: 'room' } }));
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
