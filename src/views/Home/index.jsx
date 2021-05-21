import React, { useContext } from 'react';
import { Group, Div, Button, Spacing } from '@vkontakte/vkui';
import { Icon16Add } from '@vkontakte/icons';

import { ViewContext } from '../../context';

const Home = () => {
  const { popoutRootRef, setActivePanel, setIsPopout } =
    useContext(ViewContext);

  return (
    <>
      <Group separator="hide" style={{ width: '100%' }}>
        <Div>
          <Button
            mode="primary"
            size="l"
            stretched
            before={<Icon16Add />}
            getRootRef={popoutRootRef}
            onClick={() => {
              setIsPopout(true);
            }}
          >
            Присоединиться
          </Button>
          <Spacing size={12} />

          <Button
            mode="primary"
            size="l"
            stretched
            onClick={() => setActivePanel('room')}
          >
            Создать игру
          </Button>
        </Div>
        <Spacing size={24} />
      </Group>
    </>
  );
};

export { Home };
