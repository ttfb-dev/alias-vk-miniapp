import React from 'react';
import { useSelector } from 'react-redux';
import { ChannelErrors } from '@logux/client/react';
import { AppRoot, Root, Epic, View, Panel } from '@vkontakte/vkui';

import { Home } from './Home';
import { Room } from './Room';
import { Modal } from './Modal';

const App = () => {
  const state = useSelector((state) => state);

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
              <ChannelErrors>
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
