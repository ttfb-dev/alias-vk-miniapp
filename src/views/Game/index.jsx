import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useSubscription } from '@logux/redux';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderContent,
  PanelHeaderContext,
  Title,
  Headline,
  Div,
  Group,
  Caption,
  Spacing,
  List,
  SimpleCell,
  Avatar,
  Button,
  CellButton,
  Text,
  Header,
  MiniInfoCell,
} from '@vkontakte/vkui';
import { Icon16InfoCirle, Icon16Dropdown } from '@vkontakte/icons';

import { general } from '../../store';
import { ReactComponent as Logo } from '../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../assets/logo-bg.svg';
import { ReactComponent as Hourglass } from '../../assets/hourglass.svg';
import { ReactComponent as Trophy } from '../../assets/trophy.svg';

import styles from './index.module.scss';

const Game = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const teams = useSelector((state) => state.room.teams);
  // const roomId = useSelector((state) => state.room.roomId);
  const myTeamId = useSelector((state) => state.room.myTeamId);
  const ownerId = useSelector((state) => state.room.ownerId);
  const members = useSelector((state) => state.room.members);
  const [isOpened, setIsOpened] = useState(false);
  // const isSubscribing = useSubscription([`room/${roomId}/game`]);

  const myTeam = useMemo(() => {
    return teams.find((team) => team.teamId === myTeamId);
  }, [teams, myTeamId]);

  const onExit = () => {
    setIsOpened(false);

    // dispatch.sync(room.action.leave());
    dispatch(general.action.route({ activePanel: 'room' }));
  };

  return (
    <Panel {...props}>
      <PanelHeader left={<PanelHeaderBack onClick={onExit} />} separator={false} shadow={true}>
        <PanelHeaderContent
          before={
            <div style={{ lineHeight: 0 }}>
              <Logo style={{ width: '28px', height: '28px' }} />
            </div>
          }
          aside={
            <Icon16Dropdown
              style={{ transform: `rotate(${isOpened ? '180deg' : '0'})` }}
              onClick={() => setIsOpened(!isOpened)}
            />
          }
          status={myTeam?.name}
        >
          Alias
        </PanelHeaderContent>
      </PanelHeader>
      <PanelHeaderContext opened={isOpened} onClose={() => setIsOpened(!isOpened)}>
        <List>
          <CellButton mode='danger' centered onClick={onExit}>
            Выйти из игры
          </CellButton>
        </List>
      </PanelHeaderContext>

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.background} />
          <LogoBackground />
        </div>

        <Div className={styles.content}>
          <Div className={styles.roundWrapper}>
            <div>
              <Title level={2} weight='semibold' style={{ color: '#fff' }}>
                Текущий круг
              </Title>
              <Spacing size={4} />

              <Headline weight='regular' style={{ color: '#fff', opacity: 0.72 }}>
                Отыграли 3 из 4 команд
              </Headline>
              <Spacing size={20} />

              <Caption caps level={1} weight='semibold' className={styles.awaiting}>
                <Hourglass style={{ marginRight: '4px' }} />
                Ожидание хода
              </Caption>
              <Spacing size={12} />
            </div>

            <div className={styles.round}>
              <p className={styles.count}>2</p>
            </div>
          </Div>

          <Group mode='card' separator='hide' className={styles.teamWrapper}>
            <Header mode='primary'>{`Ход команды «${teams[0].name}»`}</Header>
            <Spacing size={20} />
            <div className={styles.team}>
              <SimpleCell
                hasHover={false}
                hasActive={false}
                before={<Avatar size={40} src={members[0].photo_50} />}
                style={{ flex: 1, borderRight: '1px solid var(--content_tint_foreground)' }}
                description='объясняет'
              >
                Трисс
              </SimpleCell>
              <SimpleCell
                hasHover={false}
                hasActive={false}
                before={<Avatar size={40} src={members[0].photo_50} />}
                style={{ flex: 1 }}
                description='угадывает'
              >
                Геральт
              </SimpleCell>
            </div>
          </Group>

          <Group mode='card' separator='hide' className={styles.statistics}>
            <Header mode='primary'>Команды</Header>
            <List>
              <SimpleCell
                hasHover={false}
                hasActive={false}
                after={
                  <div className={styles.score}>
                    <Trophy />
                    <Text weight='regular'>4223</Text>
                  </div>
                }
              >
                Пирожки
              </SimpleCell>
              <SimpleCell
                hasHover={false}
                hasActive={false}
                after={
                  <div className={styles.score}>
                    <Trophy />
                    <Text weight='regular'>433</Text>
                  </div>
                }
              >
                Сладкие булочки
              </SimpleCell>
            </List>
          </Group>
        </Div>

        <Spacing size={20} />
      </div>

      <div className={styles.fixedLayout}>
        {userId === ownerId ? (
          <Div>
            <Button stretched mode='primary' size='l'>
              Начать ход
            </Button>
          </Div>
        ) : (
          <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
            Для начала нужно 4 и более участников. После начала игры присоединиться новым участникам будет нельзя.
          </MiniInfoCell>
        )}
      </div>
    </Panel>
  );
};

export { Game };
