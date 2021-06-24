import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon20Dropdown, Icon24CupOutline } from '@vkontakte/icons';
import {
  Avatar,
  Button,
  Caption,
  CellButton,
  Div,
  Group,
  Header,
  Headline,
  List,
  Panel,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderContext,
  PanelSpinner,
  Placeholder,
  SimpleCell,
  Spacing,
  Text,
  Title,
} from '@vkontakte/vkui';

import { ReactComponent as Hourglass } from '@/assets/hourglass.svg';
import { ReactComponent as Logo } from '@/assets/logo-mini.svg';
import { ReactComponent as Trophy } from '@/assets/trophy.svg';
import { Container } from '@/components';
import { game, general } from '@/store';

import { getNextStep } from '../helpers';

import './Lobby.scss';
import styles from './Lobby.module.scss';

const Lobby = ({ isSubscribing, ...props }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const isDebug = useSelector((state) => state.general.isDebug);
  const teams = useSelector((state) => state.room.teams);
  const ownerId = useSelector((state) => state.room.ownerId);
  const teamsList = useSelector((state) => state.room.teamsList);
  const teamsCompleted = useSelector((state) => state.room.teamsCompleted);
  const myTeamId = useSelector((state) => state.room.myTeamId);
  const membersList = useSelector((state) => state.room.membersList);
  const statistics = useSelector((state) => state.game.statistics);
  const stepNumber = useSelector((state) => state.game.stepNumber);
  const roundNumber = useSelector((state) => state.game.roundNumber);
  const step = useSelector((state) => state.game.step);
  const [isOpened, setIsOpened] = useState(false);

  const isExplainer = useMemo(() => userId === step?.explainerId, [userId, step]);
  const isGuesser = useMemo(() => userId === step?.guesserId, [userId, step]);
  const isOwner = useMemo(() => userId === ownerId, [userId, ownerId]);

  const onStepStart = () => {
    dispatch.sync(game.action.stepStart({ startedAt: Date.now() }));
  };

  const onNextStep = () => {
    const { nextStepNumber, nextRoundNumber, step } = getNextStep({
      stepNumber,
      roundNumber,
      teamsCompleted,
      teams,
    });

    dispatch.sync(game.action.stepNext({ stepNumber: nextStepNumber, roundNumber: nextRoundNumber, step }));
  };

  const onRoomLeave = () => {
    setIsOpened(false);

    dispatch(general.action.alert({ isRoomLeaveAlert: true }));
  };

  const onGameFinish = () => {
    setIsOpened(false);

    dispatch(general.action.alert({ isGameFinishAlert: true }));
  };

  return (
    <Panel {...props}>
      <Container>
        <PanelHeader separator={false} shadow={true}>
          <PanelHeaderContent
            before={
              <div style={{ lineHeight: 0 }}>
                <Logo style={{ width: '32px', height: '32px', color: 'var(--header_tint)' }} />
              </div>
            }
            aside={<Icon20Dropdown style={{ transform: `rotate(${isOpened ? '180deg' : '0'})` }} />}
            status={teamsList[myTeamId]?.name ?? 'Без названия'}
            onClick={() => setIsOpened(!isOpened)}
          >
            Игра
          </PanelHeaderContent>
        </PanelHeader>
        <PanelHeaderContext opened={isOpened} onClose={() => setIsOpened(!isOpened)}>
          <List>
            {isOwner && (
              <CellButton mode='danger' centered onClick={onGameFinish}>
                Закончить игру
              </CellButton>
            )}
            <CellButton mode='danger' centered onClick={onRoomLeave}>
              Выйти из игры
            </CellButton>
          </List>
        </PanelHeaderContext>

        {isSubscribing ? (
          <PanelSpinner />
        ) : (
          <Div className={styles.content}>
            <Div className={styles.roundWrapper}>
              <div>
                <Title level={2} weight='semibold' style={{ color: '#fff' }}>
                  Текущий круг
                </Title>
                <Spacing size={4} />

                <Headline weight='regular' style={{ color: '#fff', opacity: 0.72 }}>
                  {`Сейчас ${stepNumber ?? ':('} из ${teamsCompleted} ходов`}
                </Headline>
                <Spacing size={20} />

                <Caption caps level={1} weight='semibold' className={styles.awaiting}>
                  <Hourglass style={{ marginRight: '4px' }} />
                  {isExplainer || isGuesser ? 'Ваш ход' : 'Ожидание хода'}
                </Caption>
                <Spacing size={12} />
              </div>

              <div className={styles.round}>
                <p className={styles.count}>{roundNumber}</p>
              </div>
            </Div>

            <Group mode='card' separator='hide' className={styles.teamWrapper}>
              <Header mode='tertiary' className='headerCentered'>
                {`Ход команды «${teamsList[step?.teamId]?.name ?? 'Без названия'}»`}
              </Header>
              <Spacing size={20} />
              <div className={styles.team}>
                <SimpleCell
                  hasHover={false}
                  hasActive={false}
                  before={<Avatar size={40} src={membersList[step?.explainerId]?.photo_50 ?? null} />}
                  style={{ flex: 1, borderRight: '1px solid var(--content_tint_foreground)' }}
                  description='объясняет'
                >
                  {membersList[step?.explainerId]?.first_name ?? 'Без имени'}
                </SimpleCell>
                <SimpleCell
                  hasHover={false}
                  hasActive={false}
                  before={<Avatar size={40} src={membersList[step?.guesserId]?.photo_50 ?? null} />}
                  style={{ flex: 1 }}
                  description='угадывает'
                >
                  {membersList[step?.guesserId]?.first_name ?? 'Без имени'}
                </SimpleCell>
              </div>
            </Group>

            <Group mode='card' separator='hide' className={styles.statistics}>
              <Header mode='primary'>Команды</Header>
              {!!statistics.length ? (
                <List>
                  {statistics.map((team) => (
                    <SimpleCell
                      key={team.id}
                      hasHover={false}
                      hasActive={false}
                      after={
                        <div className={styles.score}>
                          <Trophy />
                          <Text weight='regular'>{team.score}</Text>
                        </div>
                      }
                    >
                      {teamsList[team.id].name}
                    </SimpleCell>
                  ))}
                </List>
              ) : (
                <Placeholder icon={<Icon24CupOutline width={48} height={48} />}>
                  Здесь будет вестить статистика команд
                </Placeholder>
              )}
            </Group>
          </Div>
        )}

        {isExplainer && <Spacing size={20} />}

        {!isSubscribing && (isExplainer || isDebug) && (
          <div className={styles.fixedLayout}>
            <Div>
              <Button stretched mode='primary' size='l' onClick={onStepStart}>
                Начать ход
              </Button>
              {isDebug && (
                <>
                  <Spacing size={12} />
                  <Button stretched mode='destructive' size='l' onClick={onNextStep}>
                    Передать ход
                  </Button>
                </>
              )}
            </Div>
          </div>
        )}
      </Container>
    </Panel>
  );
};

export { Lobby };
