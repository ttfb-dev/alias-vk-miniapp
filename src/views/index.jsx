import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChannelErrors } from '@logux/client/react';
import { AppRoot, Root, Epic, View, Panel } from '@vkontakte/vkui';

import { general, room } from '../store';

import { Home } from './Home';
import { Room } from './Room';
import { Modal } from './Modal';

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (state.room.roomId === null) {
      dispatch.sync(room.action.whereIAm());
    }
  }, [dispatch, state.room.roomId]);

  useEffect(() => {
    if (state.room.roomId !== null) {
      dispatch(general.action.route({ activePanel: 'room', activeModal: 'teams' }));
    }
  }, [dispatch, state.room.roomId]);

  return (
    <AppRoot>
      <Epic activeStory='home' tabbar>
        <Root id='home' activeView={state.general.activeView}>
          <View id='home' activePanel={state.general.activePanel} modal={<Modal />}>
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
