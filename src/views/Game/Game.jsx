import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { track } from '@logux/client';
import { useClient } from '@logux/client/react';
import { parseId } from '@logux/core';
import { useSubscription } from '@logux/redux';
import { Alert, View } from '@vkontakte/vkui';

import { game, general, room } from '@/store';

import { getInitStep } from './helpers';
import { Lobby } from './Lobby';
import { Room } from './Room';
import { Step } from './Step';

const Game = (props) => {
  const client = useClient();
  const dispatch = useDispatch();
  const activePanel = useSelector((state) => state.general.game.activePanel);
  const userId = useSelector((state) => state.general.game.userId);
  const isRoomLeaveAlert = useSelector((state) => state.general.isRoomLeaveAlert);
  const isGameFinishAlert = useSelector((state) => state.general.isGameFinishAlert);
  const roomId = useSelector((state) => state.room.roomId);
  const teams = useSelector((state) => state.room.teams);

  useSubscription([`room/${roomId}`]);

  const onRoute = useCallback((route) => dispatch(general.action.route(route)), [dispatch]);

  useEffect(() => {
    const state = client.type(
      'room/state',
      (action) => {
        const { status: roomStatus } = action.room;
        const { status: gameStatus } = action.game;

        if (roomStatus === 'game') {
          if (gameStatus === 'step') {
            onRoute({ activeView: 'game', game: { activePanel: 'step' } });
          } else if (gameStatus === 'lobby') {
            onRoute({ activeView: 'game', game: { activePanel: 'lobby' } });
          }
        } else if (roomStatus === 'lobby') {
          onRoute({ activeView: 'game', game: { activePanel: 'room' } });
        }
      },
      { event: 'add' },
    );

    const start = client.type(
      game.action.start.type,
      (_, meta) => {
        const { userId: parsedUserId } = parseId(meta.id);
        const actionUserId = parseInt(parsedUserId, 10);
        const { stepNumber, roundNumber, step } = getInitStep({ teams });

        dispatch(
          game.action.setInitState({
            stepNumber,
            roundNumber,
            statistics: [],
            statisticsList: {},
            step,
            stepHistory: [],
            currentWord: {},
            words: [],
            wordsCount: null,
          }),
        );

        if (actionUserId !== userId) {
          // редиректить в игру всех, кроме инициатора экшена
          onRoute({ activeView: 'game', game: { activePanel: 'lobby' }, activeModal: null });
        } else {
          // у инициатора редирект происходит после перехода экшена в состояние processed
          track(client, meta.id).then(() => {
            onRoute({ activeView: 'game', game: { activePanel: 'lobby' }, activeModal: null });
          });
        }
      },
      { event: 'add' },
    );

    const finish = client.type(
      game.action.finish.type,
      (_, meta) => {
        const { userId: parsedUserId } = parseId(meta.id);
        const actionUserId = parseInt(parsedUserId, 10);

        // редиректить в комнату всех, кроме инициатора экшена
        if (actionUserId !== userId) {
          onRoute({ activeView: 'game', game: { activePanel: 'room' }, activeModal: 'game-results' });
        } else {
          // у инициатора редирект происходит после перехода экшена в состояние processed
          track(client, meta.id).then(() => {
            onRoute({ activeView: 'game', game: { activePanel: 'room' }, activeModal: 'game-results' });
          });
        }
      },
      { event: 'add' },
    );

    const stepStart = client.type(
      game.action.stepStart.type,
      () => {
        onRoute({ activeView: 'game', game: { activePanel: 'step' }, activeModal: null });
      },
      { event: 'add' },
    );

    const stepFinish = client.type(
      game.action.stepFinish.type,
      () => {
        onRoute({ activeView: 'game', game: { activePanel: 'lobby' } });
      },
      { event: 'add' },
    );

    const leave = client.type(room.action.leave.type, (_, meta) => {
      track(client, meta.id).then(() => {
        onRoute({ activeView: 'main', main: { activePanel: 'home' }, activeModal: null });
      });
    });

    return () => {
      state();
      start();
      finish();
      stepStart();
      stepFinish();
      leave();
    };
  }, [client, dispatch, onRoute, teams, userId]);

  const onRoomLeave = useCallback(() => {
    dispatch.sync(room.action.leave());
  }, [dispatch]);

  const onGameFinish = useCallback(() => {
    dispatch.sync(game.action.finish());
  }, [dispatch]);

  const onClose = useCallback(() => {
    dispatch(general.action.alert({ isRoomLeaveAlert: false, isGameFinishAlert: false }));
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

  const gameFinishAlert = (
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
          action: onGameFinish,
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
      popout={(isRoomLeaveAlert && roomLeaveAlert) || (isGameFinishAlert && gameFinishAlert)}
    >
      <Room id='room' />

      <Lobby id='lobby' />

      <Step id='step' />
    </View>
  );
};

export { Game };
