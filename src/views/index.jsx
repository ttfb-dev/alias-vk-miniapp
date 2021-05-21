import React, { useContext } from 'react';
import { AppRoot, Root, Epic, View, Panel } from '@vkontakte/vkui';

import { ViewContext } from '../context';

import { Home } from './Home';
import { Room } from './Room';
import { Set } from './Set';
import { About } from './About';
import { Modal } from './Modal';

const App = () => {
  const { activeView } = useContext(ViewContext);

  return (
    <AppRoot>
      <Epic activeStory="home" tabbar>
        <Root id="home" activeView={activeView}>
          <View id="home" activePanel="home" modal={<Modal />}>
            <Panel id="home">
              <Home />
            </Panel>
          </View>

          <View id="room" activePanel="room">
            <Panel id="room">
              <Room />
            </Panel>
          </View>

          <View id="set" activePanel="set">
            <Panel id="set">
              <Set />
            </Panel>
          </View>

          <View id="about" activePanel="about">
            <Panel id="about">
              <About />
            </Panel>
          </View>
        </Root>
      </Epic>
    </AppRoot>
  );
};

export { App };
