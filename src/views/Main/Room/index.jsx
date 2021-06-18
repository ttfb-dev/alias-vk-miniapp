import React, { useMemo, useEffect, useState, useCallback } from 'react';
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
  Icon20Info,
  Icon28SettingsOutline,
  Icon28UserAddOutline,
  Icon28WorkOutline,
  Icon28QrCodeOutline,
  Icon28InfoOutline,
} from '@vkontakte/icons';
import qr from '@vkontakte/vk-qr';

import AppService from '../../../services';
import { declension } from '../../../helpers';
import { general, room } from '../../../store';
import { ReactComponent as Logo } from '../../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../../assets/logo-bg.svg';

import styles from './index.module.scss';

const Room = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const teams = useSelector((state) => state.room.teams);
  const teamsCompleted = useSelector((state) => state.room.teamsCompleted);
  const roomId = useSelector((state) => state.room.roomId);
  const ownerId = useSelector((state) => state.room.ownerId);
  const settings = useSelector((state) => state.room.settings);
  const memberIds = useSelector((state) => state.room.memberIds);
  const sets = useSelector((state) => state.room.sets);
  const availableSets = useSelector((state) => state.room.availableSets);
  const [isOpened, setIsOpened] = useState(false);
  const isSubscribing = useSubscription([`room/${roomId}`]);

  const hasTeam = useMemo(() => teams.some((team) => team.memberIds.includes(userId)), [teams, userId]);

  const isOwner = useMemo(() => {
    return userId === ownerId;
  }, [userId, ownerId]);

  const teamsCount = useMemo(() => {
    return teams.length;
  }, [teams]);

  const membersCount = useMemo(() => {
    return memberIds.length;
  }, [memberIds]);

  const membersForm = useMemo(() => {
    return declension(membersCount, ['человек', 'человека', 'человек']);
  }, [membersCount]);

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
    AppService.getUserProfiles(memberIds).then((members) => {
      dispatch(room.action.setMembers({ members }));
    });
  }, [memberIds, dispatch]);

  const onRoute = useCallback((route) => dispatch(general.action.route(route)), [dispatch]);

  const onGameStart = () => {
    dispatch.sync(room.action.gameStart());
  };

  const onLeave = () => {
    setIsOpened(false);

    dispatch.sync(room.action.leave());

    onRoute({ main: { activePanel: 'home' } });
  };

  const tabbar = (
    <Tabbar>
      <TabbarItem onClick={() => onRoute({ activeModal: 'teams' })} selected data-story='teams' text='Команды'>
        <Icon28UserAddOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => onRoute({ activeModal: 'room-sets' })}
        indicator={<Badge mode='prominent' />}
        selected
        data-story='room-sets'
        text='Наборы слов'
      >
        <Icon28WorkOutline />
      </TabbarItem>
      <TabbarItem onClick={() => onRoute({ activeModal: 'share-code' })} selected data-story='share-code' text='QR-код'>
        <Icon28QrCodeOutline />
      </TabbarItem>
      <TabbarItem onClick={() => onRoute({ activeModal: 'rules' })} selected data-story='rules' text='Правила'>
        <Icon28InfoOutline />
      </TabbarItem>
    </Tabbar>
  );

  return (
    <Panel {...props}>
      <PanelHeader left={<PanelHeaderBack onClick={onLeave} />} separator={false} shadow={true}>
        <PanelHeaderContent
          before={
            <div style={{ lineHeight: 0 }}>
              <Logo style={{ width: '32px', height: '32px', color: 'var(--header_tint)' }} />
            </div>
          }
          aside={
            isOwner ? (
              <Icon28SettingsOutline
                width={20}
                height={20}
                style={{ marginLeft: '4px' }}
                onClick={() => setIsOpened(!isOpened)}
              />
            ) : null
          }
          status={settings?.name}
        >
          Комната
        </PanelHeaderContent>
      </PanelHeader>
      {isOwner && (
        <PanelHeaderContext opened={isOpened} onClose={() => setIsOpened(!isOpened)}>
          <List>
            <CellButton mode='primary' disabled centered>
              Настройки
            </CellButton>
          </List>
        </PanelHeaderContext>
      )}

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
                onClick={() => onRoute({ activeModal: 'teams' })}
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
                onClick={() => onRoute({ activeModal: 'members' })}
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
                onClick={() => onRoute({ activeModal: 'room-sets' })}
              >
                Наборы слов
              </SimpleCell>
            </Div>
          </Div>
        )}
      </div>

      {!isSubscribing && (
        <div className={styles.fixedLayout}>
          {!hasTeam ? (
            <MiniInfoCell
              before={<Icon20Info />}
              mode='more'
              textLevel='primary'
              textWrap='full'
              onClick={() => onRoute({ activeModal: 'teams' })}
            >
              Для участия в игре выберите команду.
            </MiniInfoCell>
          ) : hasTeam && isOwner ? (
            <Div>
              <Button mode='primary' size='l' disabled={teamsCompleted < 2} stretched onClick={onGameStart}>
                Начать игру
              </Button>
            </Div>
          ) : null}
        </div>
      )}

      {tabbar}
    </Panel>
  );
};

export { Room };
