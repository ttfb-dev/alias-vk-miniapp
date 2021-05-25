import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabbar, TabbarItem, Badge, Group, Div, Button, Spacing, UsersStack } from '@vkontakte/vkui';
import { Icon16Add, Icon28WorkOutline, Icon28ScanViewfinderOutline, Icon28InfoOutline } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';

import styles from './index.module.scss';

import { general, room } from '../../store';
import { ReactComponent as Logo } from '../../assets/logo.svg';
// import { ReactComponent as Background } from '../../assets/bg-home.svg';

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const tabbar = (
    <Tabbar>
      <TabbarItem
        onClick={() => dispatch(general.action.route({ activeModal: 'sets' }))}
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
      <TabbarItem
        onClick={() => dispatch(general.action.route({ activeModal: 'rules' }))}
        selected
        data-story='rules'
        text='Правила'
      >
        <Icon28InfoOutline />
      </TabbarItem>
    </Tabbar>
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.background} />
        {/* <Background className={styles.background} /> */}
        <Logo />
        <UsersStack size='m' count={3} layout='vertical'>
          Алексей, Илья, Михаил
          <br />и ещё 3 человека
        </UsersStack>
      </div>

      <Group separator='hide' style={{ width: '100%' }}>
        <Div>
          <Button
            mode='primary'
            size='l'
            stretched
            before={<Icon16Add />}
            onClick={() => dispatch(general.action.route({ activeModal: 'qr-code' }))}
          >
            Присоединиться
          </Button>
          <Spacing size={12} />

          <Button
            mode='primary'
            size='l'
            stretched
            onClick={() => {
              if (state.room.roomId !== null) {
                dispatch(general.action.route({ activePanel: 'room' }));
              } else {
                dispatch.sync(room.action.create());
              }
            }}
          >
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
