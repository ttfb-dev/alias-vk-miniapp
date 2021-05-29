import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoot, Root, Epic, View, ScreenSpinner } from '@vkontakte/vkui';

import { general, profile, room } from '../store';

import { Home } from './Home';
import { Room } from './Room';
import { Modal } from './Modal';

const App = () => {
  const dispatch = useDispatch();
  const activeView = useSelector((state) => state.general.activeView);
  const activePanel = useSelector((state) => state.general.activePanel);
  const roomId = useSelector((state) => state.room.roomId);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (roomId === null) {
      setIsLoading(true);

      dispatch.sync(profile.action.getSets());

      dispatch.sync(room.action.whereIAm()).then(() => {
        setIsLoading(false);
      });
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (roomId !== null) {
      dispatch(general.action.route({ activePanel: 'room' /* , activeModal: 'teams' */ }));
    }
  }, [dispatch, roomId]);

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
