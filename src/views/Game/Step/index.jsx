import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { differenceInSeconds } from 'date-fns';
import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderContext,
  PanelSpinner,
  Header,
  Title,
  Div,
  Group,
  Spacing,
  List,
  SimpleCell,
  CellButton,
  Button,
  Switch,
  Placeholder,
} from '@vkontakte/vkui';
import { Icon20Dropdown } from '@vkontakte/icons';

import { general, game } from '../../../store';
// import { LinkedList } from '../../../helpers';
import { ReactComponent as Logo } from '../../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../../assets/logo-bg.svg';

import { useTimer } from '../hooks';
import { formatTime } from '../helpers';

import styles from './index.module.scss';
import './index.scss';

const renderAt = Date.now();

const Step = ({ isSubscribing, ...props }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const isDebug = useSelector((state) => state.general.isDebug);
  // const teams = useSelector((state) => state.room.teams);
  const teamsList = useSelector((state) => state.room.teamsList);
  // const teamsCompleted = useSelector((state) => state.room.teamsCompleted);
  const myTeamId = useSelector((state) => state.room.myTeamId);
  const startedAt = useSelector((state) => state.game.step?.startedAt ?? null);
  // const stepNumber = useSelector((state) => state.game.stepNumber);
  // const roundNumber = useSelector((state) => state.game.roundNumber);
  const currentWord = useSelector((state) => state.game.currentWord);
  const step = useSelector((state) => state.game.step);
  const diffTime = differenceInSeconds(renderAt, startedAt);
  const { time, status } = useTimer(60 - diffTime);
  const [isOpened, setIsOpened] = useState(false);

  const isExplainer = useMemo(() => {
    return userId === step?.explainerId;
  }, [userId, step]);

  useEffect(() => {
    if (isExplainer || isDebug) {
      addWords();
      nextWord();
    }
  }, []); // eslint-disable-line

  const addWords = () => {
    dispatch.sync(game.action.getWords());
  };

  const nextWord = () => {
    dispatch(game.action.setWord());
  };

  const onExit = () => {
    setIsOpened(false);

    // dispatch.sync(room.action.leave());
    dispatch(general.action.route({ activeView: 'main', main: { activePanel: 'home' } }));
  };

  const onNextWord = (guessed) => {
    const word = { ...currentWord, guessed };

    dispatch(game.action.setStepWord({ word }));

    nextWord();
  };

  /* const onNextStep = () => {
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

    dispatch.sync(game.action.setTimestamp({ timestamp: Date.now() }));
    dispatch.sync(game.action.setStep({ stepNumber: nextStepNumber, roundNumber: nextRoundNumber, step: nextStep }));
  }; */

  return (
    <Panel {...props}>
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
            <Div className={clsx(styles.timerWrapper, status === 'STOPPED' && styles.timerBackground)}>
              <Title className={styles.title} level={2} weight='semibold'>
                Таймер
              </Title>
              <span className={styles.clock}>{formatTime(time)}</span>
            </Div>

            {(isExplainer || isDebug) && (
              <Group mode='card' separator='hide'>
                <SimpleCell hasHover={false} hasActive={false} indicator='+25' className='score' onClick={() => {}}>
                  Текущие очки
                </SimpleCell>
              </Group>
            )}

            {((isExplainer && status === 'STOPPED') || !isExplainer || isDebug) && (
              <Group mode='card' separator='hide'>
                <Header mode='tertiary' className='headerCentered'>
                  Отыгравшие слова
                </Header>
                {step?.words && !!step.words.length ? (
                  step.words.map((word) => (
                    <SimpleCell
                      key={word.index}
                      hasActive={false}
                      hasHover={false}
                      after={<Switch disabled={!isExplainer} checked={word.guessed} onChange={() => {}} />}
                    >
                      {word.word}
                    </SimpleCell>
                  ))
                ) : (
                  <Placeholder>Здесь будут отображаться слова, которые отыграли в текущем ходе</Placeholder>
                )}
              </Group>
            )}

            {((isExplainer && status !== 'STOPPED') || isDebug) && (
              <Div className={styles.wordsContainer}>
                <Group mode='card' className={styles.wordsWrapper}>
                  <Header mode='tertiary' className='headerCentered'>
                    Ваше слово
                  </Header>
                  <Spacing size={32} />

                  <span className={styles.word}>{currentWord?.word ?? ''}</span>
                  <Spacing size={132} />

                  <Div>
                    <Button stretched mode='primary' size='l' onClick={() => onNextWord(true)}>
                      Угадал
                    </Button>
                  </Div>
                </Group>

                <Div>
                  <CellButton
                    centered
                    hasActive={false}
                    hasHover={false}
                    mode='danger'
                    onClick={() => onNextWord(false)}
                  >
                    Пропустить
                  </CellButton>
                </Div>
              </Div>
            )}
          </Div>
        )}

        <Spacing size={20} />
      </div>

      {!isSubscribing && (
        <div className={styles.fixedLayout}>
          {(isExplainer || isDebug) && (
            <Div>
              <Button stretched mode='primary' size='l' onClick={() => {}}>
                Закончить ход
              </Button>
            </Div>
          )}
        </div>
      )}
    </Panel>
  );
};

export { Step };
