import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon20Dropdown } from '@vkontakte/icons';
import {
  Button,
  Card,
  CellButton,
  Div,
  Group,
  Header,
  List,
  Panel,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderContext,
  PanelSpinner,
  Placeholder,
  SimpleCell,
  Spacing,
  Switch,
} from '@vkontakte/vkui';
import clsx from 'clsx';

import { ReactComponent as Logo } from '@/assets/logo-mini.svg';
import { Container } from '@/components';
import { game, general, room } from '@/store';

import { formatTime, getNextStep } from '../helpers';
import { useTimer } from '../hooks';

import './Step.scss';
import styles from './Step.module.scss';

const Step = ({ isSubscribing, ...props }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const isDebug = useSelector((state) => state.general.isDebug);
  const ownerId = useSelector((state) => state.room.ownerId);
  const teamsList = useSelector((state) => state.room.teamsList);
  const myTeamId = useSelector((state) => state.room.myTeamId);
  const teams = useSelector((state) => state.room.teams);
  const currentWord = useSelector((state) => state.game.currentWord);
  const wordsCount = useSelector((state) => state.game.wordsCount);
  const step = useSelector((state) => state.game.step);
  const teamsCompleted = useSelector((state) => state.room.teamsCompleted);
  const stepNumber = useSelector((state) => state.game.stepNumber);
  const roundNumber = useSelector((state) => state.game.roundNumber);
  const statistics = useSelector((state) => state.game.statistics);
  const { time, status } = useTimer({ initTime: step?.startedAt ?? null });
  const [isOpened, setIsOpened] = useState(false);

  const isExplainer = useMemo(() => userId === step?.explainerId, [userId, step]);
  const isOwner = useMemo(() => userId === ownerId, [userId, ownerId]);
  const score = useMemo(() => {
    const score = step?.score ?? 0;

    return score > 0 ? `+${score}` : `${score}`;
  }, [step]);

  useEffect(() => {
    if (isExplainer) {
      dispatch.sync(game.action.getWords()).then(() => dispatch(game.action.setNextWord()));
    }
  }, [dispatch, isExplainer]);

  const onSetWord = (guessed) => {
    const word = { ...currentWord, guessed };

    dispatch.sync(game.action.setStepWord({ word }));

    dispatch(game.action.setNextWord());

    if (wordsCount <= 5) {
      dispatch.sync(game.action.getWords());
    }
  };

  const onEditWord = (word, index) => {
    const newWord = { ...word, guessed: !word.guessed };

    dispatch.sync(game.action.editStepWord({ word: newWord, index }));
  };

  const onStepEnd = () => {
    dispatch.sync(game.action.setStepHistory());

    dispatch.sync(game.action.stepEnd()).then(() => {
      const hasWinner = statistics.some((team) => team.score > 60);
      const isLastStepInRound = stepNumber === teamsCompleted;

      if (isLastStepInRound && hasWinner) {
        dispatch.sync(room.action.gameEnd());
      } else {
        const { nextStepNumber, nextRoundNumber, step } = getNextStep({
          stepNumber,
          roundNumber,
          teamsCompleted,
          teams,
        });

        dispatch.sync(game.action.setNextStep({ stepNumber: nextStepNumber, roundNumber: nextRoundNumber, step }));
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
            aside={<Icon20Dropdown style={{ transform: `rotate(${isOpened ? '180deg' : '0'})` }} />}
            status={(teamsList && teamsList[myTeamId]?.name) ?? 'Без названия'}
            onClick={() => setIsOpened(!isOpened)}
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
                    <CellButton centered hasActive={false} mode='danger' onClick={() => onSetWord(false)}>
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
