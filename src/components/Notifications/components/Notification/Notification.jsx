import React from 'react';
import { Icon28InfoCircleOutline } from '@vkontakte/icons';
import { usePlatform } from '@vkontakte/vkui';
import clsx from 'clsx';

import styles from './Notification.module.scss';

const Notification = ({ id, title, message, type, onClose }) => {
  const platform = usePlatform();

  return (
    <article className={clsx(styles.notification, styles[`notification-${platform}`])} onClick={() => onClose(id)}>
      <div className={clsx(styles.icon, styles[`icon-${type}`])}>
        <Icon28InfoCircleOutline width={40} height={40} />
      </div>
      <h4 className={clsx(styles.title, styles[`title-${type}`])}>{title}</h4>
      <p className={styles.message}>{message}</p>
    </article>
  );
};

export { Notification };
