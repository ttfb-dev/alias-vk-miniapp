import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useClient } from '@logux/client/react';
import { Button, Div, Panel, PanelSpinner, Spacing } from '@vkontakte/vkui';

import { Container } from '@/components';
import { game } from '@/store';

import { Header } from '../components';
import { getNextStep } from '../helpers';

import { Round, Statistics, Team } from './components';

import styles from './Lobby.module.scss';

const Lobby = ({ isSubscribing, ...props }) => {
  const client = useClient();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const isDebug = useSelector((state) => state.general.isDebug);
  const teams = useSelector((state) => state.room.teams);
  const teamsCompleted = useSelector((state) => state.room.teamsCompleted);
  const stepNumber = useSelector((state) => state.game.stepNumber);
  const roundNumber = useSelector((state) => state.game.roundNumber);
  const step = useSelector((state) => state.game.step);

  const isExplainer = useMemo(() => userId === step?.explainerId, [userId, step]);

  const onStepStart = () => {
    dispatch.sync(game.action.stepStart({ startedAt: Date.now() - client.node.timeFix }));
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

  return (
    <Panel {...props}>
      <Container>
        <Header />

        {isSubscribing ? (
          <PanelSpinner height={192} size='large' />
        ) : (
          <>
            <Div className={styles.container}>
              <Round />

              <Team />

              <Statistics />
            </Div>

            {isExplainer && <Spacing size={68} />}

            {(isExplainer || isDebug) && (
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
          </>
        )}
      </Container>
    </Panel>
  );
};

export { Lobby };
