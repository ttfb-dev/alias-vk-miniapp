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
  const isGameEndAlert = useSelector((state) => state.general.isGameEndAlert);
  const roomId = useSelector((state) => state.room.roomId);
  const teams = useSelector((state) => state.room.teams);
  const isSubscribing = useSubscription([`room/${roomId}`]);

  const onRoute = useCallback((route) => dispatch(general.action.route(route)), [dispatch]);

  useEffect(() => {
    const roomState = client.type(
      'room/state',
      (action) => {
        if (action.room.status === 'game') {
          if (action.game.status === 'step') {
            onRoute({ activeView: 'game', game: { activePanel: 'step' } });
          } else if (action.game.status === 'lobby') {
            onRoute({ activeView: 'game', game: { activePanel: 'lobby' } });
          }
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
            status: '',
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

    return () => {
      roomState();
      start();
      finish();
      stepStart();
      stepFinish();
    };
  }, [client, dispatch, onRoute, teams, userId]);

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
      <Room id='room' isSubscribing={isSubscribing} />

      <Lobby id='lobby' isSubscribing={isSubscribing} />

      <Step id='step' isSubscribing={isSubscribing} />
    </View>
  );
};

export { Game };
