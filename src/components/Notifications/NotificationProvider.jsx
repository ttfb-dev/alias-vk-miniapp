import React, { useEffect } from 'react';

import { NotificationRoot } from './components';
import { emitter, events } from './emitter';
import { useNotification } from './hooks';
import { NotificationContext } from './NotificationContext';

const NotificationProvider = ({ children, container, delay, limit }) => {
  const { notifications, dispatch } = useNotification();

  useEffect(() => {
    const show = emitter.on(events.SHOW, (notification) => {
      const dupe = notifications.find((n) => n.code === notification.code);
      if (dupe) {
        return;
      }

      if (notifications.length >= limit) {
        const firstId = notifications[0].id;

        dispatch({ type: 'REMOVE', id: firstId });
      }

      dispatch({ type: 'ADD', notification });

      if (delay) {
        setTimeout(() => {
          dispatch({ type: 'REMOVE', id: notification.id });
        }, delay);
      }
    });

    const hide = emitter.on(events.HIDE, (id) => dispatch({ type: 'REMOVE', id }));

    const hideAll = emitter.on(events.HIDE_ALL, () => dispatch({ type: 'REMOVE_ALL' }));

    return () => {
      show();
      hide();
      hideAll();
    };
  }, [dispatch, notifications, delay, limit]);

  const onClose = (id) => {
    emitter.emit(events.HIDE, id);
  };

  return (
    <NotificationContext.Provider value={''}>
      {children}
      <NotificationRoot notifications={notifications} container={container} onClose={onClose} />
    </NotificationContext.Provider>
  );
};

export { NotificationProvider };
