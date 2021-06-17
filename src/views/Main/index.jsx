import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parseId } from '@logux/core';
import { useClient } from '@logux/client/react';
import { View, ScreenSpinner } from '@vkontakte/vkui';

import { general, room } from '../../store';

import { Home } from './Home';
import { Room } from './Room';

const Main = (props) => {
  const client = useClient();
  const dispatch = useDispatch();
  const activePanel = useSelector((state) => state.general.main.activePanel);
  const ownerId = useSelector((state) => state.room.ownerId);
  const [isLoading, setIsLoading] = useState(false);

  const onRoute = useCallback((route) => dispatch(general.action.route(route)), [dispatch]);

  useEffect(() => {
    const whereIAm = client.type(
      room.action.whereIAm.type,
      () => {
        setIsLoading(true);
      },
      { event: 'add' },
    );

    const whereIAmDone = client.type(
      `${room.action.whereIAm.type}_success`,
      (action) => {
        setIsLoading(false);

        if (action.roomId !== null) {
          dispatch(room.action.setRoomId({ roomId: action.roomId }));
          onRoute({ activeView: 'main', main: { activePanel: 'room' } /* , activeModal: 'teams' */ });
        }
      },
      { event: 'add' },
    );

    const joinRoom = client.type(
      room.action.join.type,
      () => {
        setIsLoading(true);
      },
      { event: 'add' },
    );

    const joinRoomDone = client.type(
      `${room.action.join.type}_success`,
      () => {
        setIsLoading(false);

        onRoute({ activeView: 'main', main: { activePanel: 'room' }, activeModal: null });
      },
      { event: 'add' },
    );

    const joinRoomFailed = client.type(
      `${room.action.join.type}_error`,
      () => {
        setIsLoading(false);

        onRoute({ activeModal: null });
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
        const { userId } = parseId(meta.id);

        // редиректить в игру только через resend, у инициатора экшена другое флоу перехода в игру
        if (userId !== ownerId) {
          onRoute({ activeView: 'game', game: { activePanel: 'lobby' }, activeModal: null });
        }
      },
      { event: 'add' },
    );

    return () => {
      whereIAm();
      whereIAmDone();
      joinRoom();
      joinRoomDone();
      joinRoomFailed();
      roomState();
      gameStart();
    };
  }, [client, dispatch, onRoute, ownerId]);

  return (
    <View {...props} activePanel={activePanel} popout={isLoading && <ScreenSpinner />}>
      <Home id='home' />

      <Room id='room' />
    </View>
  );
};

export { Main };
