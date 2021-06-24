import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Div, Panel, PanelSpinner, Spacing } from '@vkontakte/vkui';

import { Container } from '@/components';
import { game } from '@/store';

import { Header } from '../components';
import { getNextStep } from '../helpers';
import { useTimer } from '../hooks';

import { Score, Timer, Word, Words } from './components';

import styles from './Step.module.scss';

const Step = ({ isSubscribing, ...props }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const isDebug = useSelector((state) => state.general.isDebug);
  const teams = useSelector((state) => state.room.teams);
  const teamsCompleted = useSelector((state) => state.room.teamsCompleted);
  const stepNumber = useSelector((state) => state.game.stepNumber);
  const roundNumber = useSelector((state) => state.game.roundNumber);
  const statistics = useSelector((state) => state.game.statistics);
  const step = useSelector((state) => state.game.step);
  const { time, status } = useTimer({ initTime: step?.startedAt ?? null });

  const isExplainer = useMemo(() => userId === step?.explainerId, [userId, step]);
  const isWatcher = useMemo(() => userId !== step?.explainerId, [userId, step]);
  const isRunning = useMemo(() => isExplainer && status !== 'STOPPED', [isExplainer, status]);
  const isStopped = useMemo(() => isExplainer && status === 'STOPPED', [isExplainer, status]);

  useEffect(() => {
    if (isExplainer) {
      dispatch.sync(game.action.getWords()).then(() => dispatch(game.action.stepSetNextWord()));
    }
  }, [dispatch, isExplainer]);

  const onStepFinish = () => {
    dispatch.sync(game.action.stepSetHistory()).then(() => {
      const hasWinner = statistics.some((team) => team.score > 60);
      const isLastStepInRound = stepNumber === teamsCompleted;

      if (isLastStepInRound && hasWinner) {
        dispatch.sync(game.action.finish());
      } else {
        const { nextStepNumber, nextRoundNumber, step } = getNextStep({
          stepNumber,
          roundNumber,
          teamsCompleted,
          teams,
        });

        dispatch.sync(game.action.stepFinish());

        dispatch.sync(game.action.stepNext({ stepNumber: nextStepNumber, roundNumber: nextRoundNumber, step }));
      }
    });
  };

  return (
    <Panel {...props}>
      <Container>
        <Header />

        {isSubscribing ? (
          <PanelSpinner />
        ) : (
          <Div className={styles.container}>
            <Timer time={time} status={status} />

            {(isStopped || isWatcher) && <Score />}

            {(isStopped || isWatcher) && <Words />}

            {isRunning && <Word />}
          </Div>
        )}

        {isStopped && <Spacing size={20} />}

        {!isSubscribing && isStopped && (
          <div className={styles.fixedLayout}>
            <Div>
              <Button stretched mode='primary' size='l' onClick={onStepFinish}>
                Закончить ход
              </Button>
            </Div>
          </div>
        )}

        {!isSubscribing && isDebug && (
          <div className={styles.fixedLayout}>
            <Div>
              <Button stretched mode='destructive' size='l' onClick={onStepFinish}>
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
