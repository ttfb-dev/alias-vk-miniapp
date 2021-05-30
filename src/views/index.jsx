import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useClient } from '@logux/client/react';
import { AppRoot, Root, Epic, View, ScreenSpinner } from '@vkontakte/vkui';

import { general, room } from '../store';

import { Home } from './Home';
import { Room } from './Room';
import { Modal } from './Modal';

const App = () => {
  const client = useClient();
  const dispatch = useDispatch();
  const activeView = useSelector((state) => state.general.activeView);
  const activePanel = useSelector((state) => state.general.activePanel);
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
          dispatch(general.action.route({ activePanel: 'room' /* , activeModal: 'teams' */ }));
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

        dispatch(general.action.route({ activePanel: 'room' /* , activeModal: 'teams' */ }));
      },
      { event: 'add' },
    );

    return () => {
      whereIAm();
      whereIAmDone();
      joinRoom();
      joinRoomDone();
    };
  }, [client, dispatch]);

  return (
    <AppRoot>
      <Epic activeStory='home' tabbar>
        <Root id='home' activeView={activeView}>
          <View id='home' activePanel={activePanel} modal={<Modal />} popout={isLoading && <ScreenSpinner />}>
            <Home id='home' />

            <Room id='room' />
          </View>
        </Root>
      </Epic>
    </AppRoot>
  );
};

export { App };
