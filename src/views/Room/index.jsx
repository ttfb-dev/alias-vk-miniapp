import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from '@logux/redux';
import {
  Tabbar,
  TabbarItem,
  Badge,
  CardGrid,
  Card,
  SimpleCell,
  Group,
  Div,
  PanelHeader,
  PanelHeaderBack,
  PanelSpinner,
} from '@vkontakte/vkui';
import {
  Icon28UserAddOutline,
  Icon28WorkOutline,
  Icon28ScanViewfinderOutline,
  Icon28InfoOutline,
} from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import qr from '@vkontakte/vk-qr';

import { general, room } from '../../store';
import { ReactComponent as Logo } from '../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../assets/logo-bg.svg';

import styles from './index.module.scss';

const Room = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const isSubscribing = useSubscription([`room/${state.room.roomId}`]);

  const qrCode = useMemo(() => {
    // const url = JSON.stringify({ roomId: state.room.roomId });
    const url = `http://vk.com/app7856384#join-room=${state.room.roomId}`;

    const svg = qr.createQR(url, {
      qrSize: 256,
      isShowLogo: true,
      foregroundColor: '#4680c2',
    });

    return { url, svg };
  }, [state.room.roomId]);

  const tabbar = (
    <Tabbar>
      <TabbarItem
        onClick={() => dispatch(general.action.route({ activeModal: 'teams' }))}
        selected
        data-story='sets'
        text='Команды'
      >
        <Icon28UserAddOutline />
      </TabbarItem>
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
      <PanelHeader
        left={
          <PanelHeaderBack
            onClick={() => {
              dispatch.sync(room.action.leave()).then(() => {
                dispatch(general.action.route({ activePanel: 'home' }));
              });
            }}
          />
        }
        separator={false}
      >
        <Logo />
      </PanelHeader>

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.background} />
          <LogoBackground />
        </div>

        {isSubscribing ? (
          <PanelSpinner />
        ) : (
          <Group>
            <CardGrid className={styles.grid}>
              <Card mode='outline' size='m' className={styles.card}>
                <SimpleCell
                  onClick={() => dispatch(general.action.route({ activeModal: 'teams' }))}
                  description='1 из 2'
                  expandable
                >
                  Команды
                </SimpleCell>
              </Card>
              <Card mode='outline' size='m' className={styles.card}>
                <button
                  type='button'
                  className={styles.qr}
                  onClick={() => dispatch(general.action.route({ activeModal: 'share-code' }))}
                >
                  <Div className={styles.code} dangerouslySetInnerHTML={{ __html: qrCode.svg }} />
                </button>
              </Card>
              <Card mode='outline' size='m' className={styles.card}>
                <SimpleCell description='8 игр' expandable>
                  Статистика
                </SimpleCell>
              </Card>
              <Card mode='outline' size='l' className={styles.card}>
                <SimpleCell expandable indicator='2 из 15 выбрано'>
                  Наборы слов
                </SimpleCell>
              </Card>
            </CardGrid>
          </Group>
        )}
      </div>

      {tabbar}
    </>
  );
};

export { Room };
