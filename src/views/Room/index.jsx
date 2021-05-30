import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from '@logux/redux';
import {
  FixedLayout,
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
  Button,
  Spacing,
} from '@vkontakte/vkui';
import { Icon28UserAddOutline, Icon28WorkOutline, Icon28QrCodeOutline, Icon28InfoOutline } from '@vkontakte/icons';
import qr from '@vkontakte/vk-qr';

import app from '../../services';
import { general, room } from '../../store';
import { ReactComponent as Logo } from '../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../assets/logo-bg.svg';

import styles from './index.module.scss';

const Room = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const teams = useSelector((state) => state.room.teams);
  const roomId = useSelector((state) => state.room.roomId);
  const ownerId = useSelector((state) => state.room.ownerId);
  const settings = useSelector((state) => state.room.settings);
  const memberIds = useSelector((state) => state.room.memberIds);
  const sets = useSelector((state) => state.room.sets);
  const availableSets = useSelector((state) => state.room.availableSets);
  const isSubscribing = useSubscription([`room/${roomId}`]);

  const teamsCompleted = useMemo(() => {
    return teams.reduce((acc, team) => (acc += !!(team.memberIds.length > 1)), 0);
  }, [teams]);

  const setsActive = useMemo(() => {
    return sets.filter((set) => set.status === 'active').length;
  }, [sets]);

  const setsCount = useMemo(() => {
    return sets.length + availableSets.length;
  }, [sets, availableSets]);

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
      dispatch(room.action.setMembers({ members }));
    });
  }, [memberIds, dispatch]);

  const tabbar = (
    <Tabbar>
      <TabbarItem
        onClick={() => dispatch(general.action.route({ activeModal: 'teams' }))}
        selected
        data-story='teams'
        text='Команды'
      >
        <Icon28UserAddOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => dispatch(general.action.route({ activeModal: 'room-sets' }))}
        indicator={<Badge mode='prominent' />}
        selected
        data-story='room-sets'
        text='Наборы слов'
      >
        <Icon28WorkOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => dispatch(general.action.route({ activeModal: 'share-code' }))}
        selected
        data-story='share-code'
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
    <Panel {...props}>
      <PanelHeader
        left={
          <PanelHeaderBack
            onClick={() => {
              dispatch.sync(room.action.leave());
              dispatch(general.action.route({ activePanel: 'home' }));
            }}
          />
        }
        separator={false}
      >
        <Logo />
      </PanelHeader>
      <div className={styles.subheader}>
        {settings?.name && (
          <Title level={2} weight='semibold'>
            Комната «{`${settings?.name}`}»
          </Title>
        )}
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
                  description={`${teamsCompleted} и ${teams.length}`}
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
                <SimpleCell
                  expandable
                  indicator={`${setsActive} из ${setsCount} выбрано`}
                  onClick={() => dispatch(general.action.route({ activeModal: 'room-sets' }))}
                >
                  Наборы слов
                </SimpleCell>
              </Card>
            </CardGrid>
          </Group>
        )}
      </div>

      {ownerId === userId && (
        <FixedLayout vertical='bottom' style={{ zIndex: 'auto' }}>
          <Div>
            <Button
              mode='primary'
              size='l'
              stretched
              onClick={() => dispatch(general.action.route({ activePanel: 'game' }))}
            >
              Начать игру
            </Button>
          </Div>
          <Spacing />
        </FixedLayout>
      )}

      {tabbar}
    </Panel>
  );
};

export { Room };
