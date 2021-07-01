import React from 'react';
import clsx from 'clsx';

import { ReactComponent as LogoBackground } from '@/assets/logo-bg.svg';

import styles from './Container.module.scss';

const Container = ({ children, className }) => (
  <div className={clsx(styles.container, className)}>
    <div className={styles.wrapper}>
      <div className={styles.background} />
      <LogoBackground />
    </div>

    {children}
  </div>
);

export { Container };
