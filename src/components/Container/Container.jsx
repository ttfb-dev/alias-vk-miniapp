import React from 'react';

import { ReactComponent as LogoBackground } from '@/assets/logo-bg.svg';

import styles from './index.module.scss';

const Container = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.background} />
      <LogoBackground />
    </div>

    {children}
  </div>
);

export { Container };
