import React, { memo, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePlatform } from '@vkontakte/vkui';
import clsx from 'clsx';

import { Notification } from '..';

import styles from './NotificationRoot.module.scss';

const NotificationRoot = memo(({ notifications, container, position, onClose }) => {
  const platform = usePlatform();
  const [mountNode, setMountNode] = useState();

  useEffect(() => setMountNode(container || document.body), [container]);

  const containerPosition = useMemo(
    () => (position === 'top' ? `${position}-${platform}` : position),
    [position, platform],
  );

  return mountNode ? (
    createPortal(
      <section className={clsx(styles.container, styles[containerPosition], styles[platform])}>
        {notifications.map((notification) => (
          <Notification key={notification.id} onClose={onClose} {...notification} />
        ))}
      </section>,
      mountNode,
    )
  ) : (
    <></>
  );
});

NotificationRoot.displayName = 'NotificationRoot';

export { NotificationRoot };
