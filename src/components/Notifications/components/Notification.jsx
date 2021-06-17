import React from 'react';
import clsx from 'clsx';

import styles from './Notification.module.scss';

const Notification = ({ id, title, message, type, onClose }) => {
  return (
    <div className={clsx(styles.notification, styles[`notification-${type}`])}>
      <div className={clsx(styles.icon, styles[`icon-${type}`])}></div>
      <h4 className={clsx(styles.title, styles[`title-${type}`])}>{{ title }}</h4>
      <p className={styles.message}>{{ message }}</p>
      <div className={styles.close}>
        <button onClick={() => onClose(id)} />
      </div>
    </div>
  );
};

export { Notification };
