import React, { memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePlatform } from '@vkontakte/vkui';
import clsx from 'clsx';

import { Notification } from '..';

import styles from './NotificationRoot.module.scss';

const NotificationRoot = memo(({ notifications, container, onClose }) => {
  const platform = usePlatform();
  const [mountNode, setMountNode] = useState();

  useEffect(() => setMountNode(container || document.body), [container]);

  return mountNode
    ? createPortal(
        <section className={clsx(styles.container, styles[platform])}>
          {notifications.map((notification) => (
            <Notification key={notification.id} onClose={onClose} {...notification} />
          ))}
        </section>,
        mountNode,
      )
    : null;
});

NotificationRoot.displayName = 'NotificationRoot';

export { NotificationRoot };