import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabbar, TabbarItem, Badge, Group, Div, Button, Spacing, UsersStack } from '@vkontakte/vkui';
import { Icon16Add, Icon28WorkOutline, Icon28ScanViewfinderOutline, Icon28InfoOutline } from '@vkontakte/icons';

import vkapi from '../../api';
import { app } from '../../services';
import { queryStringParse } from '../../helpers';
import { general, room } from '../../store';
import { ReactComponent as Logo } from '../../assets/logo.svg';

import styles from './index.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const roomId = useSelector((state) => state.room.roomId);
  const friendsPhotos = useSelector((state) => state.general.friends.map((friend) => friend.photo_50));

  useEffect(() => {
    app.getFriends().then((friends) => {
      dispatch(general.action.setFriends({ friends }));
    });
  }, []); // eslint-disable-line

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
        onClick={async () => {
          const code = await vkapi.openCodeReader();
          const url = new URL(code);
          const hashParams = queryStringParse(url.hash);

          if (hashParams?.roomId) {
            dispatch.sync(room.action.join({ roomId: parseInt(hashParams.roomId, 10) }));
          }
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
        <Logo />
        <UsersStack photos={friendsPhotos} size='m' count={3} layout='vertical'>
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
              if (roomId !== null) {
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
