import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useSubscription } from '@logux/redux';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
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
  Text,
  Header,
  MiniInfoCell,
} from '@vkontakte/vkui';
import { Icon16InfoCirle } from '@vkontakte/icons';

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
  // const isSubscribing = useSubscription([`room/${roomId}/game`]);

  const myTeam = useMemo(() => {
    return teams.find((team) => team.teamId === myTeamId);
  }, [teams, myTeamId]);

  return (
    <Panel {...props}>
      <PanelHeader
        left={
          <PanelHeaderBack
            onClick={() => {
              dispatch(general.action.route({ activePanel: 'room' }));
            }}
          />
        }
        separator={false}
      >
        <Logo />
      </PanelHeader>

      <Div className={styles.subheaderWrapper}>
        {!!myTeam && (
          <Title level={2} weight='semibold' className={styles.subheader}>
            {`Команда «${myTeam.name}»`}
          </Title>
        )}
      </Div>

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
            <Header mode='tertiary'>{`Ход команды «${teams[0].name}»`}</Header>
            <Spacing size={20} />
            <div className={styles.team}>
              <SimpleCell
                before={<Avatar size={40} src={members[0].photo_50} />}
                style={{ flex: 1, borderRight: '1px solid var(--content_tint_foreground)' }}
                description='объясняет'
              >
                Трисс
              </SimpleCell>
              <SimpleCell
                before={<Avatar size={40} src={members[0].photo_50} />}
                style={{ flex: 1 }}
                description='угадывает'
              >
                Геральт
              </SimpleCell>
            </div>
          </Group>
          <Group mode='card' separator='hide' className={styles.statistics}>
            <Header mode='tertiary'>Команды</Header>
            <List>
              <SimpleCell
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
