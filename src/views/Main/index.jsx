import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { track } from '@logux/client';
import { useClient } from '@logux/client/react';
import { ScreenSpinner, View } from '@vkontakte/vkui';

import { notify } from '@/components';
import { general, room } from '@/store';

import { Home } from './Home';

const Main = (props) => {
  const client = useClient();
  const dispatch = useDispatch();
  const activePanel = useSelector((state) => state.general.main.activePanel);
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
          onRoute({ activeView: 'game', game: { activePanel: 'room' } /* , activeModal: 'teams' */ });
        }
      },
      { event: 'add' },
    );

    const join = client.type(
      room.action.join.type,
      (_, meta) => {
        setIsLoading(true);

        track(client, meta.id)
          .then(() => {
            setIsLoading(false);

            onRoute({ activeView: 'game', game: { activePanel: 'room' }, activeModal: null });
          })
          .catch(({ action }) => {
            setIsLoading(false);

            notify.error({ message: action.message });
          });
      },
      { event: 'add' },
    );

    const leave = client.type(room.action.leave.type, (_, meta) => {
      track(client, meta.id)
        .then(() => {
          onRoute({ activeView: 'main', main: { activePanel: 'home' }, activeModal: null });
        })
        .catch(({ action }) => {
          notify.error({ message: action.message });
        });
    });

    return () => {
      whereIAm();
      whereIAmDone();
      join();
      leave();
    };
  }, [client, dispatch, onRoute]);

  return (
    <View {...props} activePanel={activePanel} popout={isLoading && <ScreenSpinner />}>
      <Home id='home' />
    </View>
  );
};

export { Main };
