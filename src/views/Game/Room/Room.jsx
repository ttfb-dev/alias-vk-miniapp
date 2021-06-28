import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Icon20Info,
  Icon28InfoOutline,
  Icon28QrCodeOutline,
  Icon28UserAddOutline,
  Icon28WorkOutline,
} from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import qr from '@vkontakte/vk-qr';
import { isNumeric } from '@vkontakte/vkjs';
import {
  Badge,
  Button,
  Card,
  Div,
  MiniInfoCell,
  Panel,
  PanelSpinner,
  SimpleCell,
  Tabbar,
  TabbarItem,
  Tooltip,
} from '@vkontakte/vkui';

import { Container } from '@/components';
import { declension } from '@/helpers';
import AppService from '@/services';
import { game, general, room } from '@/store';

import { Header } from '../components';

import styles from './Room.module.scss';

const Room = ({ ...props }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const teams = useSelector((state) => state.room.teams);
  const teamsCompleted = useSelector((state) => state.room.teamsCompleted);
  const roomId = useSelector((state) => state.room.roomId);
  const ownerId = useSelector((state) => state.room.ownerId);
  const memberIds = useSelector((state) => state.room.memberIds);
  const sets = useSelector((state) => state.room.sets);
  const availableSets = useSelector((state) => state.room.availableSets);

  const hasTeam = useMemo(() => teams.some((team) => team.memberIds.includes(userId)), [teams, userId]);
  const isOwner = useMemo(() => userId === ownerId, [userId, ownerId]);
  const teamsCount = useMemo(() => teams.length, [teams]);
  const membersCount = useMemo(() => memberIds.length, [memberIds]);
  const setsActive = useMemo(() => sets.filter((set) => set.status === 'active').length, [sets]);
  const setsCount = useMemo(() => sets.length + availableSets.length, [sets, availableSets]);
  const isReadyToStart = useMemo(() => teamsCompleted >= 2 && setsActive >= 1, [teamsCompleted, setsActive]);

  const [showTooltipIndex, setShowTooltipIndex] = useState(0);

  useEffect(() => {
    bridge.send('VKWebAppStorageGet', { keys: ['showRoomTooltipIndex'] }).then((result) => {
      const value = result.keys[0].value;
      const index = isNumeric(value) ? parseInt(value) : 1;
      setShowTooltipIndex(index);
    });
  }, []);

  const onTooltipClose = (next) => {
    bridge.send('VKWebAppStorageSet', { key: 'showRoomTooltipIndex', value: String(next) }).then(() => {
      setShowTooltipIndex(next);
    });
  };

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
    dispatch.sync(game.action.start());
  };

  const tabbar = (
    <Tabbar>
      <TabbarItem onClick={() => onRoute({ activeModal: 'teams' })} selected text='Команды'>
        <Icon28UserAddOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => onRoute({ activeModal: 'room-sets' })}
        indicator={<Badge mode='prominent' />}
        selected
        text='Наборы слов'
      >
        <Icon28WorkOutline />
      </TabbarItem>
      <TabbarItem onClick={() => onRoute({ activeModal: 'share-code' })} selected text='QR-код'>
        <Icon28QrCodeOutline />
      </TabbarItem>
      <TabbarItem onClick={() => onRoute({ activeModal: 'rules' })} selected text='Правила'>
        <Icon28InfoOutline />
      </TabbarItem>
    </Tabbar>
  );

  return (
    <Panel {...props}>
      <Container>
        <Header />

        <Suspense fallback={<PanelSpinner />}>
          <Div className={styles.grid}>
            <Tooltip
              isShown={showTooltipIndex === 2}
              onClose={() => onTooltipClose(3)}
              alignY='bottom'
              alignX='left'
              mode={'accent'}
              offsetY={8}
              text='Выбери команду, в которой будешь играть'
            >
              <Card mode='shadow' className={styles.card}>
                <SimpleCell
                  expandable
                  hasHover={false}
                  hasActive={false}
                  description={`${teamsCompleted} и ${teamsCount}`}
                  onClick={() => onRoute({ activeModal: 'teams' })}
                >
                  Команды
                </SimpleCell>
              </Card>
            </Tooltip>
            <Tooltip
              isShown={showTooltipIndex === 1}
              onClose={() => onTooltipClose(2)}
              alignY='bottom'
              alignX='right'
              offsetY={9}
              offsetX={-1}
              text='Покажи QR-код друзьям, чтобы они присоединились к тебе'
            >
              <Card mode='shadow' className={styles.card}>
                <Div dangerouslySetInnerHTML={{ __html: qrCode.svg }} className={styles.qrCodeWrapper} />
              </Card>
            </Tooltip>
            <Card mode='shadow' className={styles.card}>
              <SimpleCell
                expandable
                hasHover={false}
                hasActive={false}
                description={`${membersCount} ${declension(membersCount, ['человек', 'человека', 'человек'])}`}
                onClick={() => onRoute({ activeModal: 'members' })}
              >
                Участники
              </SimpleCell>
            </Card>
            <Tooltip
              isShown={showTooltipIndex === 3}
              onClose={() => onTooltipClose(4)}
              alignY='bottom'
              alignX='left'
              mode={'accent'}
              offsetY={8}
              text={
                isOwner
                  ? 'Тут живут наборы, которые ты встретишь в процессе игры'
                  : 'Тут живут наборы, которые ты встретишь в процессе игры\nИми повелевает создатель комнаты'
              }
            >
              <Card mode='shadow' className={styles.card}>
                <SimpleCell
                  expandable
                  hasHover={false}
                  hasActive={false}
                  indicator={`${setsActive} из ${setsCount} ${declension(setsActive, [
                    'выбран',
                    'выбрано',
                    'выбрано',
                  ])}`}
                  onClick={() => onRoute({ activeModal: 'room-sets' })}
                >
                  Наборы слов
                </SimpleCell>
              </Card>
            </Tooltip>
          </Div>

          <div className={styles.fixedLayout}>
            {!hasTeam ? (
              <Div>
                <Card mode='shadow'>
                  <MiniInfoCell
                    before={<Icon20Info />}
                    mode='more'
                    textLevel='secondary'
                    textWrap='full'
                    onClick={() => onRoute({ activeModal: 'teams' })}
                  >
                    Для участия в игре выберите команду. После начала игры присоединиться новым участникам будет нельзя.
                  </MiniInfoCell>
                </Card>
              </Div>
            ) : isOwner ? (
              <Div>
                <Button mode='primary' size='l' disabled={!isReadyToStart} stretched onClick={onGameStart}>
                  Начать игру
                </Button>
              </Div>
            ) : null}
          </div>
        </Suspense>

        {tabbar}
      </Container>
    </Panel>
  );
};

export { Room };
