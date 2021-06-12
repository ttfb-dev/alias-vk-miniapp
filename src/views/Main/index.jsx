import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useClient } from '@logux/client/react';
import { View, ScreenSpinner } from '@vkontakte/vkui';

import { general, room } from '../../store';

import { Home } from './Home';
import { Room } from './Room';

const Main = (props) => {
  const client = useClient();
  const dispatch = useDispatch();
  const activePanel = useSelector((state) => state.general.main.activePanel);
  const [isLoading, setIsLoading] = useState(false);

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
          dispatch(
            general.action.route({ activeView: 'main', main: { activePanel: 'room' } /* , activeModal: 'teams' */ }),
          );
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

        dispatch(general.action.route({ activeView: 'main', main: { activePanel: 'room' }, activeModal: null }));
      },
      { event: 'add' },
    );

    const roomState = client.type(
      'room/state',
      (action) => {
        if (action.room.status === 'game') {
          dispatch(general.action.route({ activeView: 'game', game: { activePanel: 'lobby' } }));
        }
      },
      { event: 'add' },
    );

    const gameStart = client.type(
      room.action.gameStart.type,
      () => {
        dispatch(general.action.route({ activeView: 'game', game: { activePanel: 'lobby' } }));
      },
      { event: 'add' },
    );

    return () => {
      whereIAm();
      whereIAmDone();
      joinRoom();
      joinRoomDone();
      gameStart();
      roomState();
    };
  }, [client, dispatch]);

  return (
    <View {...props} activePanel={activePanel} popout={isLoading && <ScreenSpinner />}>
      <Home id='home' />

      <Room id='room' />
    </View>
  );
};

export { Main };
