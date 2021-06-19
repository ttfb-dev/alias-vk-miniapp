import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parseId } from '@logux/core';
import { track } from '@logux/client';
import { useClient } from '@logux/client/react';
import { AppRoot, Epic, Root } from '@vkontakte/vkui';

import { general, room, game } from '../store';
import { notify } from '../components';

import { Main } from './Main';
import { Game } from './Game';
import { Modal } from './Modal';

import './index.scss';

const App = () => {
  const client = useClient();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const activeView = useSelector((state) => state.general.activeView);

  const onRoute = useCallback((route) => dispatch(general.action.route(route)), [dispatch]);

  useEffect(() => {
    const whereIAmDone = client.type(
      `${room.action.whereIAm.type}_success`,
      (action) => {
        if (action.roomId !== null) {
          dispatch(room.action.setRoomId({ roomId: action.roomId }));
          onRoute({ activeView: 'main', main: { activePanel: 'room' } /* , activeModal: 'teams' */ });
        }
      },
      { event: 'add' },
    );

    const joinRoom = client.type(
      room.action.join.type,
      (_, meta) => {
        track(client, meta.id)
          .then(() => {
            onRoute({ activeView: 'main', main: { activePanel: 'room' }, activeModal: null });
          })
          .catch(({ action }) => {
            notify.error({ message: action.message, title: 'Ошибка' });
          });
      },
      { event: 'add' },
    );

    const roomState = client.type(
      'room/state',
      (action) => {
        if (action.room.status === 'game') {
          onRoute({ activeView: 'game', game: { activePanel: 'lobby' } });
        }
      },
      { event: 'add' },
    );

    const gameStart = client.type(
      room.action.gameStart.type,
      (_, meta) => {
        const { userId: parsedUserId } = parseId(meta.id);
        const actionUserId = parseInt(parsedUserId, 10);

        if (actionUserId !== userId) {
          // редиректить в игру только через resend, у инициатора экшена другое флоу перехода в игру
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
      whereIAmDone();
      joinRoom();
      roomState();
      gameStart();
      gameState();
      stepStart();
      stepEnd();
      gameEnd();
    };
  }, [client, dispatch, onRoute, userId]);

  return (
    <AppRoot>
      <Epic activeStory='main' tabbar>
        <Root id='main' activeView={activeView} modal={<Modal />}>
          <Main id='main' />

          <Game id='game' />
        </Root>
      </Epic>
    </AppRoot>
  );
};

export { App };
