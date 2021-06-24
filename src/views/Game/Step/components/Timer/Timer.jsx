import React from 'react';
import { Div } from '@vkontakte/vkui';
import clsx from 'clsx';

import { formatTime } from './helpers';

import styles from './Timer.module.scss';

export const Timer = ({ time, status }) => {
  return (
    <Div className={clsx(styles.timer, status === 'STOPPED' && styles.timerEnded)}>
      <span className={styles.clock}>{formatTime(time)}</span>
    </Div>
  );
};
