import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Panel, Tabbar, TabbarItem, Badge, Div, Button, Spacing } from '@vkontakte/vkui';
import { Icon16Add, Icon28WorkOutline, Icon28ScanViewfinderOutline, Icon28InfoOutline } from '@vkontakte/icons';

import vkapi from '../../../api';
import { CustomUsersStack } from '../../../components';
import { queryStringParse } from '../../../helpers';
import { general, room } from '../../../store';
import { ReactComponent as Logo } from '../../../assets/logo.svg';

import styles from './index.module.scss';

const Home = (props) => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.general.friends.map((friend) => friend.photo_50));
  const firstNames = useSelector((state) => state.general.friends.map((friend) => friend.first_name));

  const onRoute = (route) => dispatch(general.action.route(route));

  const onScanQR = async () => {
    const code = await vkapi.openCodeReader();
    const url = new URL(code);
    const hashParams = queryStringParse(url.hash);
    const roomId = parseInt(hashParams?.roomId, 10);

    if (roomId) {
      dispatch.sync(room.action.join({ roomId }));
    }
  };

  const onCreate = () =>
    dispatch
      .sync(room.action.create())
      .then(() => onRoute({ main: { activePanel: 'room' /* , activeModal: 'teams' */ } }));

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
