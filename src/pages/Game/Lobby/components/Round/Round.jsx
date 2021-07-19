import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Caption, Div, Headline, Spacing, Title } from '@vkontakte/vkui';

import { ReactComponent as Hourglass } from '@/assets/hourglass.svg';

import styles from './Round.module.scss';

export const Round = () => {
  const userId = useSelector((state) => state.general.userId);
  const teamsCompleted = useSelector((state) => state.room.teamsCompleted);
  const stepNumber = useSelector((state) => state.game.stepNumber);
  const roundNumber = useSelector((state) => state.game.roundNumber);
  const step = useSelector((state) => state.game.step);

  const isExplainer = useMemo(() => userId === step?.explainerId, [userId, step]);
  const isGuesser = useMemo(() => userId === step?.guesserId, [userId, step]);

  return (
    <Div className={styles.container}>
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
  );
};
