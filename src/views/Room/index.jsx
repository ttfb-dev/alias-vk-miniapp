import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from '@logux/redux';
import {
  Panel,
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
  Title,
  Snackbar,
  Avatar,
} from '@vkontakte/vkui';
import {
  Icon16Done,
  Icon28UserAddOutline,
  Icon28WorkOutline,
  Icon28QrCodeOutline,
  Icon28InfoOutline,
} from '@vkontakte/icons';
import qr from '@vkontakte/vk-qr';

import vkapi from '../../api';
import app from '../../services';
import { general, room } from '../../store';
import { ReactComponent as Logo } from '../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../assets/logo-bg.svg';

import styles from './index.module.scss';

const Room = () => {
  const dispatch = useDispatch();
  const roomId = useSelector((state) => state.room.roomId);
  const settings = useSelector((state) => state.room.settings);
  const memberIds = useSelector((state) => state.room.memberIds);
  const isSubscribing = useSubscription([`room/${roomId}`]);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const qrCode = useMemo(() => {
    const url = `https://vk.com/app7856384#roomId=${roomId}`;

    const svg = qr.createQR(url, {
      qrSize: 256,
      isShowLogo: true,
      foregroundColor: '#4680c2',
    });

    return { url, svg };
  }, [roomId]);

  useEffect(() => {
    app.getUsers(memberIds).then((members) => {
      dispatch(general.action.setMembers({ members }));
    });
  }, [memberIds, dispatch]);

  useEffect(() => {
    const events = (event) => {
      if (!event.detail) {
        return;
      }

      const { type, data } = event.detail;

      if (type === 'VKWebAppCopyTextResult') {
        if (data.result && !showCopyMessage) {
          setShowCopyMessage(true);
        }
      }
    };

    vkapi.bridge.subscribe(events);

    return () => vkapi.bridge.unsubscribe(events);
  }, [showCopyMessage]);

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
        onClick={() => dispatch(general.action.route({ activeModal: 'share-code' }))}
        selected
        data-story='qr-code'
        text='QR-код'
      >
        <Icon28QrCodeOutline />
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
    <Panel id='room'>
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
      <div className={styles.subheader}>
        <Title level={2} weight='semibold'>
          Комната «{`${settings?.name}`}»
        </Title>
      </div>

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
                <Div className={styles.code} dangerouslySetInnerHTML={{ __html: qrCode.svg }} />
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

      {showCopyMessage && (
        <Snackbar
          duration={3000}
          onClose={() => setShowCopyMessage(false)}
          before={
            <Avatar size={24} style={{ background: 'var(--accent)' }}>
              <Icon16Done fill='#fff' width={14} height={14} />
            </Avatar>
          }
        >
          Ссылка скопирована
        </Snackbar>
      )}
    </Panel>
  );
};

export { Room };
