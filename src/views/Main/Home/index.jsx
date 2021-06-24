import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon16Add, Icon28InfoOutline, Icon28ScanViewfinderOutline, Icon28WorkOutline } from '@vkontakte/icons';
import { Badge, Button, Div, Panel, Spacing, Tabbar, TabbarItem } from '@vkontakte/vkui';

import vkapi from '@/api';
import { ReactComponent as Logo } from '@/assets/logo.svg';
import { CustomUsersStack, notify } from '@/components';
import { queryStringParse } from '@/helpers';
import { general, room } from '@/store';

import styles from './index.module.scss';

const Home = (props) => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.general.friends.map((friend) => friend.photo_50));
  const firstNames = useSelector((state) => state.general.friends.map((friend) => friend.first_name));

  const onRoute = (route) => dispatch(general.action.route(route));

  const onScanQR = async () => {
    try {
      const code = await vkapi.openCodeReader();
      const url = new URL(code);
      const hashParams = queryStringParse(url.hash);
      const roomId = parseInt(hashParams?.roomId, 10);

      if (roomId) {
        dispatch.sync(room.action.join({ roomId }));
      }
    } catch ({ error_type, error_data }) {
      if (error_data?.error_reason === 'Unsupported platform') {
        notify.error({ message: 'Ваше устройство не поддерживает сканирование QR-кодов.' });
      } else {
        notify.error({ message: 'Что-то пошло не так, попробуйте ещё раз отсканировать QR-код.' });
      }
    }
  };

  const onCreate = () =>
    dispatch
      .sync(room.action.create())
      .then(() => onRoute({ activeView: 'game', game: { activePanel: 'room' /* , activeModal: 'teams' */ } }));

  const tabbar = (
    <Tabbar>
      <TabbarItem
        onClick={() => onRoute({ activeModal: 'sets' })}
        indicator={<Badge mode='prominent' />}
        selected
        data-story='sets'
        text='Наборы слов'
      >
        <Icon28WorkOutline />
      </TabbarItem>
      <TabbarItem onClick={onScanQR} selected data-story='qr-code' text='QR-код'>
        <Icon28ScanViewfinderOutline />
      </TabbarItem>
      <TabbarItem onClick={() => onRoute({ activeModal: 'rules' })} selected data-story='rules' text='Правила'>
        <Icon28InfoOutline />
      </TabbarItem>
    </Tabbar>
  );

  return (
    <Panel {...props}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.background} />
          <Logo />

          <Spacing size={64} />

          <CustomUsersStack photos={photos} firstNames={firstNames} size='m' visibleCount={3} layout='vertical' />
        </div>
      </div>

      <div className={styles.fixedLayout}>
        <Div>
          <Button
            onClick={() => onRoute({ activeModal: 'qr-code' })}
            mode='primary'
            size='l'
            stretched
            before={<Icon16Add />}
          >
            Присоединиться
          </Button>
          <Spacing size={12} />

          <Button onClick={onCreate} mode='primary' size='l' stretched>
            Создать комнату
          </Button>
        </Div>
      </div>

      {tabbar}
    </Panel>
  );
};

export { Home };
