import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChannelErrors, useClient } from '@logux/client/react';
import { AppRoot, Root, Epic, View, Panel, ScreenSpinner } from '@vkontakte/vkui';

import { general, room } from '../store';

import { Home } from './Home';
import { Room } from './Room';
import { Modal } from './Modal';

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch.sync(room.action.whereIAm()).then(() => {
      setIsLoading(false);
    });
  }, []); // eslint-disable-line

  useEffect(() => {
    if (state.room.roomId !== null) {
      dispatch(general.action.route({ activePanel: 'room', activeModal: 'teams' }));
    }
  }, [dispatch, state.room.roomId]);

  return (
    <AppRoot>
      <Epic activeStory='home' tabbar>
        <Root id='home' activeView={state.general.activeView}>
          <View
            id='home'
            activePanel={state.general.activePanel}
            modal={<Modal />}
            popout={isLoading && <ScreenSpinner />}
          >
            <Panel id='home'>
              <ChannelErrors Error={<div>asdaw</div>}>
                <Home />
              </ChannelErrors>
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
