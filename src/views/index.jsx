import React, { useContext } from 'react';
import {
  AppRoot,
  ModalRoot,
  ModalPage,
  Root,
  View,
  Panel,
} from '@vkontakte/vkui';

import { ViewContext } from '../context';

import { Home } from './Home';
import { Room } from './Room';
import { Sets } from './Sets';
import { About } from './About';

import { EnterCode } from './Modals/EnterCode';
import { JoinGame } from './Modals/JoinGame';

const App = () => {
  const { activePanel, activeModal, isPopout, setActiveModal } =
    useContext(ViewContext);

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
      <ModalPage id="enter-code">
        <EnterCode />
      </ModalPage>
    </ModalRoot>
  );

  const popout = <JoinGame />;

  return (
    <AppRoot>
      <Root activeView="main">
        <View
          id="main"
          activePanel={activePanel}
          modal={modal}
          popout={isPopout && popout}
        >
          <Panel id="home" centered>
            <Home />
          </Panel>
          <Panel id="room">
            <Room />
          </Panel>
          <Panel id="sets">
            <Sets />
          </Panel>
          <Panel id="about">
            <About />
          </Panel>
        </View>
      </Root>
    </AppRoot>
  );
};

export { App };
