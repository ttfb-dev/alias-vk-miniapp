import React from 'react';
import { Icon28InfoCircleOutline } from '@vkontakte/icons';
import { usePlatform } from '@vkontakte/vkui';
import clsx from 'clsx';

import styles from './Notification.module.scss';

const DEFAULT_TITLE = {
  success: 'Успех',
  error: 'Ошибка',
  warn: 'Предупреждение',
  info: 'Информация',
};

const Notification = ({ title, message, type }) => {
  const platform = usePlatform();

  return (
    <article className={clsx(styles.notification, styles[platform])}>
      <div className={clsx(styles.icon, styles[`icon-${type}`])}>
        <Icon28InfoCircleOutline width={40} height={40} />
      </div>
      <h4 className={clsx(styles.title, styles[`title-${type}`])}>{title || DEFAULT_TITLE[type]}</h4>
      <p className={styles.message}>{message}</p>
    </article>
  );
};

export { Notification };
