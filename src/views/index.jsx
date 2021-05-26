import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChannelErrors } from '@logux/client/react';
import { AppRoot, Root, Epic, View, Panel, ScreenSpinner } from '@vkontakte/vkui';

import { general, room } from '../store';

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

      dispatch.sync(room.action.whereIAm()).then(() => {
        setIsLoading(false);
      });
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (roomId !== null) {
      dispatch(general.action.route({ activePanel: 'room', activeModal: 'teams' }));
    }
  }, [dispatch, roomId]);

  return (
    <AppRoot>
      <Epic activeStory='home' tabbar>
        <Root id='home' activeView={activeView}>
          <View id='home' activePanel={activePanel} modal={<Modal />} popout={isLoading && <ScreenSpinner />}>
            <Panel id='home'>
              <Home />
            </Panel>

            <Panel id='room'>
              <ChannelErrors Error={<div>asdaw</div>}>
                <Room />
              </ChannelErrors>
            </Panel>
          </View>
        </Root>
      </Epic>
    </AppRoot>
  );
};

export { App };
