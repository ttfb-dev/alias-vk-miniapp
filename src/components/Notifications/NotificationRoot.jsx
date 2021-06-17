import React, { Fragment, memo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Notification } from './components';

const NotificationRoot = memo(({ notifications, container, component: Component = Fragment }) => {
  const [mountNode, setMountNode] = useState();

  useEffect(() => setMountNode(container || document.body), [container]);

  return mountNode
    ? createPortal(
        <Component>
          {notifications.map((notification) => (
            <Notification key={notification.id} {...notification} />
          ))}
        </Component>,
        mountNode,
      )
    : null;
});

NotificationRoot.displayName = 'NotificationRoot';

export { NotificationRoot };
