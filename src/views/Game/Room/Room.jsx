import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from '@happysanta/router';
import {
  Icon20Info,
  Icon28InfoOutline,
  Icon28QrCodeOutline,
  Icon28UserAddOutline,
  Icon28WorkOutline,
} from '@vkontakte/icons';
import qr from '@vkontakte/vk-qr';
import {
  Badge,
  Button,
  Card,
  Div,
  MiniInfoCell,
  Panel,
  PanelSpinner,
  SimpleCell,
  Snackbar,
  Tabbar,
  TabbarItem,
  Tooltip,
} from '@vkontakte/vkui';

import { Container } from '@/components';
import { declension } from '@/helpers';
import { MODAL_MEMBERS, MODAL_RULES, MODAL_SETS, MODAL_SHARE_CODE, MODAL_TEAMS } from '@/router';
import AppService from '@/services';
import { game, room } from '@/store';

import { Header } from '../components';

import styles from './Room.module.scss';

const Room = ({ isSubscribing, ...props }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const teams = useSelector((state) => state.room.teams);
  const teamsCompleted = useSelector((state) => state.room.teamsCompleted);
  const roomId = useSelector((state) => state.room.roomId);
  const ownerId = useSelector((state) => state.room.ownerId);
  const memberIds = useSelector((state) => state.room.memberIds);
  const sets = useSelector((state) => state.room.sets);
  const availableSets = useSelector((state) => state.room.availableSets);

  const [tooltipIndex, setTooltipIndex] = useState();
  const [notReady, setNotReady] = useState(false);

  const hasTeam = useMemo(() => teams.some((team) => team.memberIds.includes(userId)), [teams, userId]);
  const isOwner = useMemo(() => userId === ownerId, [userId, ownerId]);
  const teamsCount = useMemo(() => teams.length, [teams]);
  const membersCount = useMemo(() => memberIds.length, [memberIds]);
  const setsActive = useMemo(() => sets.filter((set) => set.status === 'active').length, [sets]);
  const setsCount = useMemo(() => sets.length + availableSets.length, [sets, availableSets]);
  const isReadyToStart = useMemo(() => teamsCompleted >= 2 && setsActive >= 1, [teamsCompleted, setsActive]);

  useEffect(() => {
    AppService.getTooltipIndex('roomTooltipIndex').then((index) => {
      setTooltipIndex(index);
    });
  }, []);

  useEffect(() => {
    AppService.getUserProfiles(memberIds).then((members) => {
      dispatch(room.action.setMembers({ members }));
    });
  }, [memberIds, dispatch]);

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

  const onTooltipClose = (index) => {
    AppService.setTooltipIndex('roomTooltipIndex', index);

    setTooltipIndex(index);
  };

  const onGameStart = (e) => {
    e.stopPropagation();

    dispatch.sync(game.action.start());
  };

  const tabbar = (
    <Tabbar>
      <TabbarItem onClick={() => router.pushModal(MODAL_TEAMS)} selected text='Команды'>
        <Icon28UserAddOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => router.pushModal(MODAL_SETS, { from: 'room' })}
        indicator={<Badge mode='prominent' />}
        selected
        text='Наборы слов'
      >
        <Icon28WorkOutline />
      </TabbarItem>
      <TabbarItem onClick={() => router.pushModal(MODAL_SHARE_CODE)} selected text='QR-код'>
        <Icon28QrCodeOutline />
      </TabbarItem>
      <TabbarItem onClick={() => router.pushModal(MODAL_RULES)} selected text='Правила'>
        <Icon28InfoOutline />
      </TabbarItem>
    </Tabbar>
  );

  return (
    <Panel {...props}>
      <Container>
        <Header />

        {isSubscribing ? (
          <PanelSpinner height={192} size='large' />
        ) : (
          <>
            <Div className={styles.grid}>
              <Tooltip
                isShown={tooltipIndex === 2}
                onClose={() => onTooltipClose(3)}
                alignY='bottom'
                alignX='left'
                mode={'accent'}
                offsetY={8}
                text='Выбери команду, в которой будешь играть.'
              >
                <Card mode='shadow' className={styles.card}>
                  <SimpleCell
                    expandable
                    hasHover={false}
                    hasActive={false}
                    description={`${teamsCompleted} и ${teamsCount}`}
                    onClick={() => router.pushModal(MODAL_TEAMS)}
                  >
                    Команды
                  </SimpleCell>
                </Card>
              </Tooltip>
              <Tooltip
                isShown={tooltipIndex === 1}
                onClose={() => onTooltipClose(2)}
                alignY='bottom'
                alignX='right'
                offsetY={9}
                offsetX={-1}
                text='Покажи QR-код друзьям, чтобы они присоединились к тебе.'
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
                  onClick={() => router.pushModal(MODAL_MEMBERS)}
                >
                  Участники
                </SimpleCell>
              </Card>
              <Tooltip
                isShown={tooltipIndex === 3}
                onClose={() => onTooltipClose(4)}
                alignY='bottom'
                alignX='left'
                mode={'accent'}
                offsetY={8}
                text={
                  isOwner
                    ? 'Тут живут наборы, которые ты встретишь в процессе игры.'
                    : 'Тут живут наборы, которые ты встретишь в процессе игры. Ими повелевает создатель комнаты.'
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
                    onClick={() => router.pushModal(MODAL_SETS, { from: 'room' })}
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
                      onClick={() => router.pushModal(MODAL_TEAMS)}
                    >
                      Для участия в игре выберите команду. После начала игры присоединиться новым участникам будет
                      нельзя.
                    </MiniInfoCell>
                  </Card>
                </Div>
              ) : isOwner ? (
                <Div onClick={() => setNotReady(true)}>
                  <Button mode='primary' size='l' disabled={!isReadyToStart} stretched onClick={onGameStart}>
                    Начать игру
                  </Button>
                </Div>
              ) : null}
            </div>

            {tabbar}

            {notReady && (
              <Snackbar duration={3000} onClick={() => setNotReady(false)} onClose={() => setNotReady(false)}>
                Для начала игры небходимо минимум две укомплектованные команды и минимум один набор слов.
              </Snackbar>
            )}
          </>
        )}
      </Container>
    </Panel>
  );
};

export { Room };
