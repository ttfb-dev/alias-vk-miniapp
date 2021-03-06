import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRouter } from '@happysanta/router';
import { track } from '@logux/client';
import { useClient } from '@logux/client/react';
import { parseId } from '@logux/core';
import { useSubscription } from '@logux/redux';
import { Alert, View } from '@vkontakte/vkui';

import {
  MODAL_GAME_RESULTS,
  PAGE_HOME,
  PAGE_LOBBY,
  PAGE_ROOM,
  PAGE_STEP,
  PANEL_LOBBY,
  PANEL_ROOM,
  PANEL_STEP,
  POPOUT_GAME_LEAVE,
  POPOUT_ROOM_LEAVE,
  VIEW_GAME,
} from '@/app/router';
import { game, room } from '@/store';

import { getInitStep } from './lib/helpers';
import { Lobby } from './Lobby';
import { Room } from './Room';
import { Step } from './Step';

let showResultsModal = true;

const Game = (props) => {
  const router = useRouter();
  const location = useLocation();
  const client = useClient();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const roomId = useSelector((state) => state.room.roomId);
  const teams = useSelector((state) => state.room.teams);
  const status = useSelector((state) => state.room.status);

  const isGameStarted = useMemo(() => status === 'game', [status]);

  // фикс перехода назад после выхода из комнаты
  if (roomId === null) {
    router.pushPage(PAGE_HOME);
  }

  const isSubscribing = useSubscription([`room/${roomId}`]);

  useEffect(() => {
    const state = client.type(
      'room/state',
      (action) => {
        const { status: roomStatus } = action.room;
        const { status: gameStatus } = action.game;

        if (roomStatus === 'game') {
          if (gameStatus === 'step') {
            router.pushPage(PAGE_STEP);
          } else if (gameStatus === 'lobby') {
            router.pushPage(PAGE_LOBBY);
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
            history: [],
            currentWord: {},
            words: [],
            wordsCount: null,
          }),
        );

        if (actionUserId !== userId) {
          // редиректить в игру всех, кроме инициатора экшена
          router.pushPage(PAGE_LOBBY);
        } else {
          // у инициатора редирект происходит после перехода экшена в состояние processed
          track(client, meta.id).then(() => {
            router.pushPage(PAGE_LOBBY);
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
          router.pushPage(PAGE_ROOM);
          if (showResultsModal) {
            router.pushModal(MODAL_GAME_RESULTS);
          }
        } else {
          // у инициатора редирект происходит после перехода экшена в состояние processed
          track(client, meta.id).then(() => {
            router.pushPage(PAGE_ROOM);
            if (showResultsModal) {
              router.pushModal(MODAL_GAME_RESULTS);
            }
          });
        }
      },
      { event: 'add' },
    );

    const stepStart = client.type(
      game.action.stepStart.type,
      () => {
        router.pushPage(PAGE_STEP);
      },
      { event: 'add' },
    );

    const stepFinish = client.type(
      game.action.stepFinish.type,
      () => {
        router.pushPage(PAGE_LOBBY);
      },
      { event: 'add' },
    );

    const leave = client.type(
      room.action.leave.type,
      (_, meta) => {
        track(client, meta.id).then(() => {
          router.pushPage(PAGE_HOME);
        });
      },
      { event: 'add' },
    );

    return () => {
      state();
      start();
      finish();
      stepStart();
      stepFinish();
      leave();
    };
  }, [client, dispatch, router, location, teams, userId]);

  useEffect(() => {
    return () => {
      dispatch(room.action.setRoomId({ roomId: null }));
    };
  }, [roomId, dispatch]);

  const onRoomLeave = () => {
    if (isGameStarted) {
      showResultsModal = false;
      dispatch.sync(game.action.finish({ reason: 'popout_room_leave' })).then(() =>
        dispatch.sync(room.action.leave()).then(() => {
          showResultsModal = true;
        }),
      );
    } else {
      dispatch.sync(room.action.leave());
    }
  };
  const onGameFinish = () => dispatch.sync(game.action.finish({ reason: 'popout_game_leave' }));
  const onClose = () => router.popPage();

  const alerts = (() => {
    switch (location.getPopupId()) {
      case POPOUT_ROOM_LEAVE:
        return (
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
            header='Выйти из комнаты'
            text='Вы уверены, что хотите выйти из комнаты? Игра будет завершена.'
          />
        );

      case POPOUT_GAME_LEAVE:
        return (
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

      default:
        return;
    }
  })();

  return (
    <View
      {...props}
      onSwipeBack={() => (isGameStarted ? () => {} : router.popPage())}
      history={location.hasOverlay() ? [] : location.getViewHistory(VIEW_GAME)}
      activePanel={location.getViewActivePanel(VIEW_GAME)}
      popout={alerts}
    >
      <Room nav={PANEL_ROOM} isSubscribing={isSubscribing} />

      <Lobby nav={PANEL_LOBBY} isSubscribing={isSubscribing} />

      <Step nav={PANEL_STEP} isSubscribing={isSubscribing} />
    </View>
  );
};

export { Game };
