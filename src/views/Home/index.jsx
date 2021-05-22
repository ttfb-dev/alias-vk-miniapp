import React, { useContext } from 'react';
import { Tabbar, TabbarItem, Badge, Group, Div, Button, Spacing, UsersStack } from '@vkontakte/vkui';
import { Icon16Add, Icon28WorkOutline, Icon28ScanViewfinderOutline, Icon28InfoOutline } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';

import './index.scss';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ViewContext } from '../../context';

const Home = () => {
  const { setActiveView, setActiveModal } = useContext(ViewContext);

  const tabbar = (
    <Tabbar>
      <TabbarItem
        onClick={() => setActiveView('sets')}
        indicator={<Badge mode='prominent' />}
        selected
        data-story='sets'
        text='Наборы слов'
      >
        <Icon28WorkOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => {
          bridge.send('VKWebAppOpenCodeReader').then((result) => {
            // eslint-disable-next-line
            console.log(result);
          });
        }}
        selected
        data-story='qr-code'
        text='QR-код'
      >
        <Icon28ScanViewfinderOutline />
      </TabbarItem>
      <TabbarItem onClick={() => setActiveModal('rules')} selected data-story='rules' text='Правила'>
        <Icon28InfoOutline />
      </TabbarItem>
    </Tabbar>
  );

  return (
    <>
      <div className='Home__background'>
        <Logo />
        <UsersStack size='m' count={3} layout='vertical'>
          Алексей, Илья, Михаил
          <br />и ещё 3 человека
        </UsersStack>
      </div>

      <Group separator='hide' style={{ width: '100%' }}>
        <Div>
          <Button mode='primary' size='l' stretched before={<Icon16Add />} onClick={() => setActiveModal('qr-code')}>
            Присоединиться
          </Button>
          <Spacing size={12} />

          <Button mode='primary' size='l' stretched onClick={() => setActiveModal('create-room')}>
            Создать комнату
          </Button>
        </Div>
        <Spacing />
      </Group>

      {tabbar}
    </>
  );
};

export { Home };
