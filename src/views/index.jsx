import React, { useContext } from 'react';
import {
  AppRoot,
  Root,
  Epic,
  View,
  Panel,
  Tabbar,
  TabbarItem,
  Badge,
} from '@vkontakte/vkui';
import {
  Icon28WorkOutline,
  Icon28QrCodeOutline,
  Icon28InfoOutline,
} from '@vkontakte/icons';

import './index.scss';

import { ViewContext } from '../context';

import { Home } from './Home';
import { Room } from './Room';
import { Set } from './Set';
import { About } from './About';
import { Modal } from './Modal';

const App = () => {
  const { activeView, setActiveView, setActiveModal } = useContext(ViewContext);

  const tabbar = (
    <Tabbar>
      <TabbarItem
        onClick={() => setActiveView('sets')}
        indicator={<Badge mode="prominent" />}
        selected
        data-story="sets"
        text="Наборы слов"
      >
        <Icon28WorkOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => setActiveModal('qr-code')}
        selected
        data-story="qr-code"
        text="QR-код"
      >
        <Icon28QrCodeOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => setActiveModal('rules')}
        selected
        data-story="rules"
        text="Правила"
      >
        <Icon28InfoOutline />
      </TabbarItem>
    </Tabbar>
  );

  return (
    <AppRoot>
      <Epic activeStory="home" tabbar>
        <Root id="home" activeView={activeView}>
          <View id="home" activePanel="home" modal={<Modal />}>
            <Panel id="home">
              <div className="Home__background">Alias</div>

              <Home />
              {tabbar}
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
