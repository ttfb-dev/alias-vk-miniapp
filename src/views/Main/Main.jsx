import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useRouter } from '@happysanta/router';
import { track } from '@logux/client';
import { useClient } from '@logux/client/react';
import { ScreenSpinner, View } from '@vkontakte/vkui';

import { notify } from '@/components';
import { PAGE_HOME, PAGE_ONBOARDING, PAGE_ROOM, PANEL_HOME, PANEL_ONBOARDING, VIEW_MAIN } from '@/router';
import AppService from '@/services';
import { general, room } from '@/store';

import { Home } from './Home';
import { OnBoard } from './OnBoard';

const Main = (props) => {
  const router = useRouter();
  const location = useLocation();
  const client = useClient();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    if (isLoading || isNewUser) {
      return false;
    }
    AppService.getFriendProfiles()
      .then((friends) => {
        dispatch(general.action.setFriends({ friends }));
      })
      .catch(AppService.onGetFriendProfilesError);
  }, [dispatch, isLoading, isNewUser]);

  useEffect(() => {
    AppService.isNewUser().then(setIsNewUser);
  }, []);

  useEffect(() => {
    if (isNewUser) {
      router.pushPage(PAGE_ONBOARDING);
      return;
    }
    router.pushPage(PAGE_HOME);
  }, [isNewUser, router, location]);

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
          router.pushPage(PAGE_ROOM);
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

            router.pushPage(PAGE_ROOM);
          })
          .catch(({ action }) => {
            setIsLoading(false);

            notify.error({ message: action.message });
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
      <OnBoard nav={PANEL_ONBOARDING} />
      <Home nav={PANEL_HOME} />
    </View>
  );
};

export { Main };
