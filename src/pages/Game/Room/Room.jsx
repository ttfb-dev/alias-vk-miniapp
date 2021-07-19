import React, { useMemo, useState } from 'react';
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
  Spacing,
  Tabbar,
  TabbarItem,
  Tooltip,
} from '@vkontakte/vkui';

import { MODAL_MEMBERS, MODAL_RULES, MODAL_SETS, MODAL_SHARE_CODE, MODAL_TEAMS } from '@/app/router';
import { declension } from '@/lib';
import App from '@/shared/services';
import { Container } from '@/shared/ui';
import { game } from '@/store';

import { Header } from '../ui';

import styles from './Room.module.scss';

const Room = ({ isSubscribing, ...props }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const teams = useSelector((state) => state.room.teams);
  const teamsCompleted = useSelector((state) => state.room.teamsCompleted);
  const roomId = useSelector((state) => state.room.roomId);
  const ownerId = useSelector((state) => state.room.ownerId);
  const members = useSelector((state) => state.room.members);
  const sets = useSelector((state) => state.room.sets);
  const availableSets = useSelector((state) => state.room.availableSets);

  const [tooltipIndex, setTooltipIndex] = useState(App.getTooltipIndex('roomTooltipIndex'));

  const hasTeam = useMemo(() => teams.some((team) => team.memberIds.includes(userId)), [teams, userId]);
  const isOwner = useMemo(() => userId === ownerId, [userId, ownerId]);
  const teamsCount = useMemo(() => teams.length, [teams]);
  const membersCount = useMemo(() => members.length, [members]);
  const setsActive = useMemo(() => sets.filter((set) => set.status === 'active').length, [sets]);
  const setsCount = useMemo(() => sets.length + availableSets.length, [sets, availableSets]);
  const isReadyToStart = useMemo(() => teamsCompleted >= 1 && setsActive >= 1, [teamsCompleted, setsActive]);

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
    App.setTooltipIndex('roomTooltipIndex', index);

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
                    description={`${teamsCompleted} из ${teamsCount} готовы`}
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
                <Div>
                  <Button mode='primary' size='l' disabled={!isReadyToStart} stretched onClick={onGameStart}>
                    Начать игру
                  </Button>

                  {!isReadyToStart && (
                    <>
                      <Spacing size={12} />
                      <Card mode='shadow'>
                        <MiniInfoCell before={<Icon20Info />} textLevel='secondary' textWrap='full'>
                          Для начала игры небходимо минимум две укомплектованные команды и хотя бы один набор слов.
                        </MiniInfoCell>
                      </Card>
                    </>
                  )}
                </Div>
              ) : null}
            </div>

            {tabbar}
          </>
        )}
      </Container>
    </Panel>
  );
};

export { Room };
