import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from '@logux/redux';
import {
  Panel,
  Tabbar,
  TabbarItem,
  Badge,
  SimpleCell,
  Div,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderContent,
  PanelHeaderContext,
  PanelSpinner,
  List,
  CellButton,
  Button,
  MiniInfoCell,
} from '@vkontakte/vkui';
import {
  Icon16InfoCirle,
  Icon16Dropdown,
  Icon28UserAddOutline,
  Icon28WorkOutline,
  Icon28QrCodeOutline,
  Icon28InfoOutline,
} from '@vkontakte/icons';
import qr from '@vkontakte/vk-qr';

import app from '../../../services';
import { declension } from '../../../helpers';
import { general, room } from '../../../store';
import { ReactComponent as Logo } from '../../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../../assets/logo-bg.svg';

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
  const [isOpened, setIsOpened] = useState(false);
  const isSubscribing = useSubscription([`room/${roomId}`]);

  const teamsCount = useMemo(() => {
    return teams.length;
  }, [teams]);

  const membersCount = useMemo(() => {
    return memberIds.length;
  }, [memberIds]);

  const membersForm = useMemo(() => {
    return declension(membersCount, ['человек', 'человека', 'человек']);
  }, [membersCount]);

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
      className: styles.qrCode,
    });

    return { url, svg };
  }, [roomId]);

  useEffect(() => {
    app.getUserProfiles(memberIds).then((members) => {
      dispatch(room.action.setMembers({ members }));
    });
  }, [memberIds, dispatch]);

  const onExit = () => {
    dispatch.sync(room.action.leave());
    dispatch(general.action.route({ main: { activePanel: 'room' } }));
  };

  const onRoute = (route) => dispatch(general.action.route(route));

  const tabbar = (
    <Tabbar>
      <TabbarItem
        onClick={() => onRoute({ main: { activeModal: 'teams' } })}
        selected
        data-story='teams'
        text='Команды'
      >
        <Icon28UserAddOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => onRoute({ main: { activeModal: 'room-sets' } })}
        indicator={<Badge mode='prominent' />}
        selected
        data-story='room-sets'
        text='Наборы слов'
      >
        <Icon28WorkOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => onRoute({ main: { activeModal: 'share-code' } })}
        selected
        data-story='share-code'
        text='QR-код'
      >
        <Icon28QrCodeOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => onRoute({ main: { activeModal: 'rules' } })}
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
      <PanelHeader left={<PanelHeaderBack onClick={onExit} />} separator={false} shadow={true}>
        <PanelHeaderContent
          before={
            <div style={{ lineHeight: 0 }}>
              <Logo style={{ width: '28px', height: '28px', color: 'var(--header_tint)' }} />
            </div>
          }
          aside={
            <Icon16Dropdown
              style={{ transform: `rotate(${isOpened ? '180deg' : '0'})` }}
              onClick={() => setIsOpened(!isOpened)}
            />
          }
          status={settings?.name}
        >
          Комната
        </PanelHeaderContent>
      </PanelHeader>
      <PanelHeaderContext opened={isOpened} onClose={() => setIsOpened(!isOpened)}>
        <List>
          <CellButton mode='danger' centered onClick={onExit}>
            Выйти из комнаты
          </CellButton>
        </List>
      </PanelHeaderContext>

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.background} />
          <LogoBackground />
        </div>

        {isSubscribing ? (
          <PanelSpinner />
        ) : (
          <Div className={styles.grid}>
            <Div className={styles.card}>
              <SimpleCell
                expandable
                hasHover={false}
                hasActive={false}
                description={`${teamsCompleted} и ${teamsCount}`}
                onClick={() => onRoute({ main: { activeModal: 'teams' } })}
              >
                Команды
              </SimpleCell>
            </Div>
            <Div className={styles.card}>
              <Div dangerouslySetInnerHTML={{ __html: qrCode.svg }} />
            </Div>
            <Div className={styles.card}>
              <SimpleCell
                expandable
                hasHover={false}
                hasActive={false}
                description={`${membersCount} ${membersForm}`}
                onClick={() => {}}
              >
                Участники
              </SimpleCell>
            </Div>
            <Div className={styles.card}>
              <SimpleCell
                expandable
                hasHover={false}
                hasActive={false}
                indicator={`${setsActive} из ${setsCount} выбрано`}
                onClick={() => onRoute({ main: { activeModal: 'room-sets' } })}
              >
                Наборы слов
              </SimpleCell>
            </Div>
          </Div>
        )}
      </div>

      {!isSubscribing && (
        <div className={styles.fixedLayout}>
          {userId === ownerId ? (
            <Div>
              <Button
                mode='primary'
                size='l'
                stretched
                onClick={() => onRoute({ activeView: 'game', game: { activePanel: 'lobby' } })}
              >
                Начать игру
              </Button>
            </Div>
          ) : (
            <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
              Для начала нужно 4 и более участников. После начала игры присоединиться новым участникам будет нельзя.
            </MiniInfoCell>
          )}
        </div>
      )}

      {tabbar}
    </Panel>
  );
};

export { Room };