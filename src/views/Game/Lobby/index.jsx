import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderContext,
  PanelSpinner,
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
} from '@vkontakte/vkui';
import { Icon20Dropdown } from '@vkontakte/icons';

import { general, game } from '../../../store';
import { LinkedList } from '../../../helpers';
import { ReactComponent as Logo } from '../../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../../assets/logo-bg.svg';
import { ReactComponent as Hourglass } from '../../../assets/hourglass.svg';
import { ReactComponent as Trophy } from '../../../assets/trophy.svg';

import styles from './index.module.scss';

const Lobby = ({ isSubscribing, ...props }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const isDebug = useSelector((state) => state.general.isDebug);
  const teams = useSelector((state) => state.room.teams);
  const teamsList = useSelector((state) => state.room?.teamsList);
  const teamsCompleted = useSelector((state) => state.room.teamsCompleted);
  const myTeamId = useSelector((state) => state.room.myTeamId);
  const membersList = useSelector((state) => state.room?.membersList);
  const stepNumber = useSelector((state) => state.game.stepNumber);
  const roundNumber = useSelector((state) => state.game.roundNumber);
  const step = useSelector((state) => state.game.step);
  const [isOpened, setIsOpened] = useState(false);

  const isExplainer = useMemo(() => {
    return userId === step?.explainerId;
  }, [userId, step]);

  const onExit = () => {
    setIsOpened(false);

    // dispatch.sync(room.action.leave());
    dispatch(general.action.route({ activeView: 'main', main: { activePanel: 'home' } }));
  };

  const onStart = () => {
    if (teamsCompleted >= 2) {
      dispatch.sync(game.action.stepStart({ status: 'step', startedAt: Date.now() }));
    }
  };

  const onNextStep = () => {
    const nextStepNumber = stepNumber >= teamsCompleted ? 1 : stepNumber + 1;
    const nextRoundNumber = stepNumber >= teamsCompleted ? roundNumber + 1 : roundNumber;
    const filteredTeams = teams.filter((team) => team.memberIds.length > 1);
    const teamsList = new LinkedList(filteredTeams);
    const nextTeam = teamsList.get(stepNumber - 1).next.data;
    const memberIdsList = new LinkedList(nextTeam.memberIds);
    const nextExplainerId = memberIdsList.get((roundNumber - 1) % teamsCompleted).next.data;
    const nextGuesserId = memberIdsList.get((roundNumber - 1) % teamsCompleted).next.next.data;

    const nextStep = {
      teamId: nextTeam.teamId,
      explainerId: nextExplainerId,
      guesserId: nextGuesserId,
      score: 0,
      words: [],
    };

    dispatch.sync(game.action.setStep({ stepNumber: nextStepNumber, roundNumber: nextRoundNumber, step: nextStep }));
  };

  return (
    <Panel {...props}>
      <PanelHeader separator={false} shadow={true}>
        <PanelHeaderContent
          before={
            <div style={{ lineHeight: 0 }}>
              <Logo style={{ width: '32px', height: '32px', color: 'var(--header_tint)' }} />
            </div>
          }
          aside={
            <Icon20Dropdown
              style={{ transform: `rotate(${isOpened ? '180deg' : '0'})` }}
              onClick={() => setIsOpened(!isOpened)}
            />
          }
          status={(teamsList && teamsList[myTeamId]?.name) || 'Без названия'}
        >
          Игра
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
                  {`Сейчас ${stepNumber} из ${teamsCompleted} ходов`}
                </Headline>
                <Spacing size={20} />

                <Caption caps level={1} weight='semibold' className={styles.awaiting}>
                  <Hourglass style={{ marginRight: '4px' }} />
                  Ожидание хода
                </Caption>
                <Spacing size={12} />
              </div>

              <div className={styles.round}>
                <p className={styles.count}>{roundNumber}</p>
              </div>
            </Div>

            <Group mode='card' separator='hide' className={styles.teamWrapper}>
              <Header mode='primary'>{`Ход команды «${teamsList[step.teamId]?.name ?? 'Без названия'}»`}</Header>
              <Spacing size={20} />
              <div className={styles.team}>
                <SimpleCell
                  hasHover={false}
                  hasActive={false}
                  before={<Avatar size={40} src={membersList[step.explainerId]?.photo_50 ?? null} />}
                  style={{ flex: 1, borderRight: '1px solid var(--content_tint_foreground)' }}
                  description='объясняет'
                >
                  {membersList[step.explainerId]?.first_name ?? 'Без имени'}
                </SimpleCell>
                <SimpleCell
                  hasHover={false}
                  hasActive={false}
                  before={<Avatar size={40} src={membersList[step.guesserId]?.photo_50 ?? null} />}
                  style={{ flex: 1 }}
                  description='угадывает'
                >
                  {membersList[step.guesserId]?.first_name ?? 'Без имени'}
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
        )}
        <Spacing size={20} />
      </div>

      {!isSubscribing && (
        <div className={styles.fixedLayout}>
          {(isExplainer || isDebug) && (
            <Div>
              <Button stretched mode='primary' size='l' onClick={onStart}>
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
          )}
        </div>
      )}
    </Panel>
  );
};

export { Lobby };
