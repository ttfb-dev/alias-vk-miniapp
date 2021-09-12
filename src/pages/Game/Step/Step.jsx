import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useClient } from '@logux/client/react';
import { Button, Div, Panel, PanelSpinner, Spacing } from '@vkontakte/vkui';

import { Container } from '@/shared/ui';
import { game, store } from '@/store';

import { getNextStep } from '../lib/helpers';
import { useTimer } from '../lib/hooks';
import { Header } from '../ui';

import { Score, Timer, Word, Words } from './ui';

import styles from './Step.module.scss';

const Step = ({ isSubscribing, ...props }) => {
  const client = useClient();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const isDebug = useSelector((state) => state.general.isDebug);
  const teams = useSelector((state) => state.room.teams);
  const settings = useSelector((state) => state.room.settings);
  const teamsCompleted = useSelector((state) => state.room.teamsCompleted);
  const stepNumber = useSelector((state) => state.game.stepNumber);
  const roundNumber = useSelector((state) => state.game.roundNumber);
  const step = useSelector((state) => state.game.step);
  const { time, status } = useTimer({
    initTime: step?.startedAt + client.node.timeFix ?? null,
    round: settings.stepDuration ?? 60,
  });

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
      const state = store.getState();
      const statistics = state.game.statistics;
      const scoreToWin = state.room.settings.scoreToWin ?? 60;
      const hasWinner = statistics.some((team) => team.score > scoreToWin);
      const isLastStepInRound = stepNumber === teamsCompleted;

      if (isLastStepInRound && hasWinner) {
        dispatch.sync(game.action.finish({ reason: 'has_winner' }));
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
          <PanelSpinner height={192} size='large' />
        ) : (
          <>
            <Div className={styles.container}>
              <Timer time={time} status={status} />

              {(isStopped || isWatcher) && <Score />}

              {(isStopped || isWatcher) && <Words />}

              {isRunning && <Word />}
            </Div>

            {isStopped && <Spacing size={68} />}

            {isStopped && (
              <div className={styles.fixedLayout}>
                <Div>
                  <Button stretched mode='primary' size='l' onClick={onStepFinish}>
                    Закончить ход
                  </Button>
                </Div>
              </div>
            )}
            {isDebug && (
              <Div>
                <Button stretched mode='destructive' size='l' onClick={onStepFinish}>
                  Закончить ход
                </Button>
              </Div>
            )}
          </>
        )}
      </Container>
    </Panel>
  );
};

export { Step };
