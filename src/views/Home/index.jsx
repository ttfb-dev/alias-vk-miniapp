import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { PanelHeader, Group, Div, Button, Spacing } from '@vkontakte/vkui';
import {
  Icon24Help,
  Icon24UserAdd,
  Icon24Settings,
  Icon24Game,
} from '@vkontakte/icons';

import { ViewContext } from '../../context';

const Home = () => {
  const { popoutRootRef, setActivePanel, setIsPopout } =
    useContext(ViewContext);
  const dispatch = useDispatch();

  return (
    <>
      <PanelHeader>Alias</PanelHeader>
      <Group separator="hide" style={{ width: '100%' }}>
        <Div>
          <Button
            mode="outline"
            size="l"
            stretched
            before={<Icon24UserAdd />}
            getRootRef={popoutRootRef}
            onClick={() => {
              setIsPopout(true);
              dispatch.sync({
                type: 'server/ping',
              });
            }}
          >
            Присоединиться
          </Button>
          <Spacing size={12} />

          <Button
            mode="outline"
            size="l"
            stretched
            before={<Icon24Game />}
            onClick={() => setActivePanel('room')}
          >
            Новая игра
          </Button>
          <Spacing size={12} />

          <Button
            mode="outline"
            size="l"
            stretched
            before={<Icon24Settings />}
            onClick={() => setActivePanel('sets')}
          >
            Наборы словы
          </Button>
          <Spacing size={12} />

          <Button
            mode="outline"
            size="l"
            stretched
            before={<Icon24Help />}
            onClick={() => setActivePanel('about')}
          >
            Об игре
          </Button>
        </Div>
      </Group>
    </>
  );
};

export { Home };
