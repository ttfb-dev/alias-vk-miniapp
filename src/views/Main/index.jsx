import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { track } from '@logux/client';
import { useClient } from '@logux/client/react';
import { View, ScreenSpinner } from '@vkontakte/vkui';

import { general, room } from '../../store';

import { Home } from './Home';
import { Room } from './Room';

const Main = (props) => {
  const client = useClient();
  const dispatch = useDispatch();
  const activePanel = useSelector((state) => state.general.main.activePanel);
  const userId = useSelector((state) => state.general.userId);
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
      () => {
        setIsLoading(false);
      },
      { event: 'add' },
    );

    const joinRoom = client.type(
      room.action.join.type,
      (_, meta) => {
        setIsLoading(true);

        track(client, meta.id)
          .then(() => {
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      },
      { event: 'add' },
    );

    return () => {
      whereIAm();
      whereIAmDone();
      joinRoom();
    };
  }, [client, dispatch, onRoute, userId]);

  return (
    <View {...props} activePanel={activePanel} popout={isLoading && <ScreenSpinner />}>
      <Home id='home' />

      <Room id='room' />
    </View>
  );
};

export { Main };
