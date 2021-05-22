import React, { useContext } from 'react';
import { ChannelErrors } from '@logux/client/react';
import { AppRoot, Root, Epic, View, Panel } from '@vkontakte/vkui';

import { ViewContext } from '../context';

import { Home } from './Home';
import { Room } from './Room';
import { Set } from './Set';
import { Modal } from './Modal';

const App = () => {
  const { activeView } = useContext(ViewContext);

  return (
    <AppRoot>
      <Epic activeStory='home' tabbar>
        <Root id='home' activeView={activeView}>
          <View id='home' activePanel='home' modal={<Modal />}>
            <Panel id='home'>
              <Home />
            </Panel>
          </View>

          <View id='room' activePanel='room'>
            <Panel id='room'>
              <ChannelErrors>
                <Room />
              </ChannelErrors>
            </Panel>
          </View>

          <View id='set' activePanel='set'>
            <Panel id='set'>
              <Set />
            </Panel>
          </View>
        </Root>
      </Epic>
    </AppRoot>
  );
};

export { App };
