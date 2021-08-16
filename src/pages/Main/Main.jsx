import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, useRouter } from '@happysanta/router';
import { track } from '@logux/client';
import { useClient } from '@logux/client/react';
import { ScreenSpinner, View } from '@vkontakte/vkui';

import { PANEL_HOME, PANEL_ONBOARDING, VIEW_MAIN } from '@/app/router';
import { Notification } from '@/shared/ui';
import { room } from '@/store';

import { Home } from './Home';
import { Onboarding } from './Onboarding';

const Main = (props) => {
  const router = useRouter();
  const location = useLocation();
  const client = useClient();
  const dispatch = useDispatch();
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

        if (action.roomId) {
          dispatch(room.action.setRoomId({ roomId: action.roomId }));
        }
      },
      { event: 'add' },
    );

    const join = client.type(
      room.action.join.type,
      (_, meta) => {
        // eslint-disable-next-line no-console
        console.log('called join');
        setIsLoading(true);

        track(client, meta.id)
          .then(() => {
            setIsLoading(false);
          })
          .catch(({ action }) => {
            setIsLoading(false);

            toast.error(<Notification message={action.message} type='error' />);
          });
      },
      { event: 'add' },
    );

    return () => {
      whereIAm();
      whereIAmDone();
      join();
    };
  }, [client, dispatch, router, location]);

  return (
    <View
      {...props}
      onSwipeBack={() => router.popPage()}
      history={location.hasOverlay() ? [] : location.getViewHistory(VIEW_MAIN)}
      activePanel={location.getViewActivePanel(VIEW_MAIN)}
      popout={isLoading && <ScreenSpinner />}
    >
      <Onboarding nav={PANEL_ONBOARDING} />

      <Home nav={PANEL_HOME} />
    </View>
  );
};

export { Main };
