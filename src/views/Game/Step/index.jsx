import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderContext,
  PanelSpinner,
  Header,
  Div,
  Group,
  Spacing,
  List,
  SimpleCell,
  CellButton,
  Button,
  Switch,
  Placeholder,
  Card,
} from '@vkontakte/vkui';
import { Icon20Dropdown } from '@vkontakte/icons';

import { general, game, room } from '../../../store';
import { LinkedList } from '../../../helpers';
import { Container } from '../../../components';
import { ReactComponent as Logo } from '../../../assets/logo-mini.svg';

import { useTimer } from '../hooks';
import { formatTime } from '../helpers';

import styles from './index.module.scss';
import './index.scss';

const Step = ({ isSubscribing, ...props }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const isDebug = useSelector((state) => state.general.isDebug);
  const teams = useSelector((state) => state.room.teams);
  const ownerId = useSelector((state) => state.room.ownerId);
  const teamsList = useSelector((state) => state.room.teamsList);
  const teamsCompleted = useSelector((state) => state.room.teamsCompleted);
  const myTeamId = useSelector((state) => state.room.myTeamId);
  const stepNumber = useSelector((state) => state.game.stepNumber);
  const roundNumber = useSelector((state) => state.game.roundNumber);
  const currentWord = useSelector((state) => state.game.currentWord);
  const wordsCount = useSelector((state) => state.game.wordsCount);
  const step = useSelector((state) => state.game.step);
  const statisticsList = useSelector((state) => state.game.statisticsList);
  const { time, status } = useTimer({ initTime: step?.startedAt ?? null });
  const [isOpened, setIsOpened] = useState(false);

  const isExplainer = useMemo(() => userId === step?.explainerId, [userId, step]);
  const isOwner = useMemo(() => userId === ownerId, [userId, ownerId]);
  const score = useMemo(() => {
    const score = step?.score ?? 0;

    return `${score > 0 ? `+${score}` : `${score}`}`;
  }, [step]);

  useEffect(() => {
    if (isExplainer) {
      dispatch.sync(game.action.getWords()).then(() => dispatch(game.action.setNextWord()));
    }
  }, [dispatch, isExplainer]);

  const nextWord = () => {
    dispatch(game.action.setNextWord());
  };

  const nextStep = () => {
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
      startedAt: null,
    };

    dispatch.sync(
      game.action.setNextStep({ stepNumber: nextStepNumber, roundNumber: nextRoundNumber, step: nextStep }),
    );
  };

  const onSetWord = (guessed) => {
    const word = { ...currentWord, guessed };

    dispatch.sync(game.action.setStepWord({ word }));

    nextWord();

    if (wordsCount <= 5) {
      dispatch.sync(game.action.getWords());
    }
  };

  const onEditWord = (word, index) => {
    const newWord = { ...word, guessed: !word.guessed };

    dispatch.sync(game.action.editStepWord({ word: newWord, index }));
  };

  const onStepEnd = () => {
    const score = (statisticsList[myTeamId] && statisticsList[myTeamId]?.score) || 0;

    dispatch.sync(game.action.setStepHistory());

    dispatch.sync(game.action.stepEnd()).then(() => {
      if (score + step.score > 60) {
        dispatch.sync(room.action.gameEnd());
      } else {
        nextStep();
      }
    });
  };

  const onRoomLeave = () => {
    setIsOpened(false);

    dispatch(general.action.alert({ isRoomLeaveAlert: true }));
  };

  const onGameEnd = () => {
    setIsOpened(false);

    dispatch(general.action.alert({ isGameEndAlert: true }));
  };

  return (
    <Panel {...props}>
      <Container>
        <PanelHeader separator={false} shadow={true}>
          <PanelHeaderContent
            before={
              <div style={{ lineHeight: 0 }}>
                <Logo style={{ width: '28px', height: '28px', color: 'var(--header_tint)' }} />
              </div>
            }
            aside={
              <Icon20Dropdown
                style={{ transform: `rotate(${isOpened ? '180deg' : '0'})` }}
                onClick={() => setIsOpened(!isOpened)}
              />
            }
            status={(teamsList && teamsList[myTeamId]?.name) ?? 'Без названия'}
          >
            Игра
          </PanelHeaderContent>
        </PanelHeader>
        <PanelHeaderContext opened={isOpened} onClose={() => setIsOpened(!isOpened)}>
          <List>
            {isOwner && (
              <CellButton mode='danger' centered onClick={onGameEnd}>
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
            <Div className={clsx(styles.timer, status === 'STOPPED' && styles.timerEnded)}>
              <span className={styles.clock}>{formatTime(time)}</span>
            </Div>

            {((isExplainer && status === 'STOPPED') || !isExplainer) && (
              <Card mode='shadow'>
                <SimpleCell hasHover={false} hasActive={false} indicator={score} className='score'>
                  Текущие очки
                </SimpleCell>
              </Card>
            )}

            <Div className={styles.card}>
              {((isExplainer && status === 'STOPPED') || !isExplainer) && (
                <Group mode='plain' separator='hide'>
                  <Header mode='tertiary' className='headerCentered'>
                    Отыгравшие слова
                  </Header>
                  {step?.words && !!step.words.length ? (
                    step.words.map((word, index) => (
                      <SimpleCell
                        key={word.index}
                        hasActive={false}
                        hasHover={false}
                        after={
                          <Switch
                            disabled={!isExplainer}
                            checked={word.guessed}
                            onChange={() => onEditWord(word, index)}
                          />
                        }
                      >
                        {word.value}
                      </SimpleCell>
                    ))
                  ) : (
                    <Placeholder>Здесь будут отображаться слова, которые отыграли в текущем ходе</Placeholder>
                  )}
                </Group>
              )}

              {isExplainer && status !== 'STOPPED' && (
                <>
                  <Header mode='tertiary' className='headerCentered'>
                    Ваше слово
                  </Header>

                  <span className={styles.word}>{currentWord?.value ?? ''}</span>

                  <Group mode='plain' separator='hide'>
                    <Button stretched mode='primary' size='l' onClick={() => onSetWord(true)}>
                      Угадал
                    </Button>
                    <Spacing size={12} />
                    <CellButton
                      centered
                      hasActive={false}
                      hasHover={false}
                      mode='danger'
                      onClick={() => onSetWord(false)}
                    >
                      Пропустить
                    </CellButton>
                  </Group>
                </>
              )}
            </Div>
          </Div>
        )}

        {(!isExplainer || status === 'STOPPED') && <Spacing size={20} />}

        {!isSubscribing && isExplainer && status === 'STOPPED' && (
          <div className={styles.fixedLayout}>
            <Div>
              <Button stretched mode='primary' size='l' onClick={onStepEnd}>
                Закончить ход
              </Button>
            </Div>
          </div>
        )}

        {!isSubscribing && isDebug && (
          <div className={styles.fixedLayout}>
            <Div>
              <Button stretched mode='destructive' size='l' onClick={onStepEnd}>
                Закончить ход
              </Button>
            </Div>
          </div>
        )}
      </Container>
    </Panel>
  );
};

export { Step };
