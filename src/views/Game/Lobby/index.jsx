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
  MiniInfoCell,
} from '@vkontakte/vkui';
import { Icon16InfoCirle, Icon20Dropdown } from '@vkontakte/icons';

import { general, game as gameStore } from '../../../store';
import { LinkedList } from '../../../helpers';
import { ReactComponent as Logo } from '../../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../../assets/logo-bg.svg';
import { ReactComponent as Hourglass } from '../../../assets/hourglass.svg';
import { ReactComponent as Trophy } from '../../../assets/trophy.svg';

import styles from './index.module.scss';

const Lobby = ({ isSubscribing, ...props }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const teams = useSelector((state) => state.room.teams);
  const teamsList = useSelector((state) => state.room.teamsList);
  const myTeamId = useSelector((state) => state.room.myTeamId);
  const ownerId = useSelector((state) => state.room.ownerId);
  const membersList = useSelector((state) => state.room.membersList);
  const game = useSelector((state) => state.game);
  const step = useSelector((state) => state.game.step);
  const [isOpened, setIsOpened] = useState(false);

  const stepsCount = useMemo(() => {
    return teams.reduce((acc, team) => (acc += !!(team.memberIds.length > 1)), 0);
  }, [teams]);

  const myTeam = useMemo(() => {
    return teams.find((team) => team.teamId === myTeamId);
  }, [teams, myTeamId]);

  const onExit = () => {
    setIsOpened(false);

    // dispatch.sync(room.action.leave());
    dispatch(general.action.route({ activeView: 'main', main: { activePanel: 'room' } }));
  };

  const onNextStep = () => {
    const nextStepNumber = game.stepNumber >= stepsCount ? 1 : game.stepNumber + 1;
    const nextRoundNumber = game.stepNumber >= stepsCount ? game.roundNumber + 1 : game.roundNumber;
    const filteredTeams = teams.filter((team) => team.memberIds.length > 1);
    const teamsList = new LinkedList(filteredTeams);
    const nextTeam = teamsList.get(game.stepNumber - 1).next.data;
    const memberIdsList = new LinkedList(nextTeam.memberIds);
    const nextExplainerId = memberIdsList.get((game.roundNumber - 1) % stepsCount).next.data;
    const nextGuesserId = memberIdsList.get((game.roundNumber - 1) % stepsCount).next.next.data;

    const nextStep = {
      teamId: nextTeam.teamId,
      explainerId: nextExplainerId,
      guesserId: nextGuesserId,
      score: 0,
      words: [],
    };

    dispatch(gameStore.action.setStepNumber({ stepNumber: nextStepNumber }));
    dispatch(gameStore.action.setRoundNumber({ roundNumber: nextRoundNumber }));
    dispatch(gameStore.action.setTimestamp({ timestamp: Date.now() }));
    dispatch(gameStore.action.setStep({ step: nextStep }));
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
          status={myTeam?.name}
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
                  {`Сейчас ${game.stepNumber} из ${stepsCount} ходов`}
                </Headline>
                <Spacing size={20} />

                <Caption caps level={1} weight='semibold' className={styles.awaiting}>
                  <Hourglass style={{ marginRight: '4px' }} />
                  Ожидание хода
                </Caption>
                <Spacing size={12} />
              </div>

              <div className={styles.round}>
                <p className={styles.count}>{game.roundNumber}</p>
              </div>
            </Div>

            <Group mode='card' separator='hide' className={styles.teamWrapper}>
              <Header mode='primary'>{`Ход команды «${teamsList[step.teamId]?.name}»`}</Header>
              <Spacing size={20} />
              <div className={styles.team}>
                <SimpleCell
                  hasHover={false}
                  hasActive={false}
                  before={<Avatar size={40} src={membersList[step.explainerId]?.photo_50} />}
                  style={{ flex: 1, borderRight: '1px solid var(--content_tint_foreground)' }}
                  description='объясняет'
                >
                  {membersList[step.explainerId]?.first_name}
                </SimpleCell>
                <SimpleCell
                  hasHover={false}
                  hasActive={false}
                  before={<Avatar size={40} src={membersList[step.guesserId]?.photo_50} />}
                  style={{ flex: 1 }}
                  description='угадывает'
                >
                  {membersList[step.guesserId]?.first_name}
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
          {userId === ownerId ? (
            <Div>
              <Button stretched mode='primary' size='l' onClick={onNextStep}>
                Начать ход
              </Button>
            </Div>
          ) : (
            <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
              Для начала нужно 4 и более участников. После начала игры присоединиться новым участникам будет нельзя.
            </MiniInfoCell>
          )}
        </div>
      )}
    </Panel>
  );
};

export { Lobby };
