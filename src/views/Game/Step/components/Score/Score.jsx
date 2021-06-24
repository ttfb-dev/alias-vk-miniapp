import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Card, SimpleCell } from '@vkontakte/vkui';

import './Score.scss';

export const Score = () => {
  const step = useSelector((state) => state.game.step);
  const score = useMemo(() => {
    const score = step?.score ?? 0;

    return score > 0 ? `+${score}` : `${score}`;
  }, [step]);

  return (
    <Card mode='shadow'>
      <SimpleCell hasHover={false} hasActive={false} indicator={score} className='score'>
        Текущие очки
      </SimpleCell>
    </Card>
  );
};
