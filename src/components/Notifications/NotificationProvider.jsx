import React, { useEffect } from 'react';

import { NotificationRoot } from './components';
import { dispatcher, emitter, events } from './events';
import { useNotification } from './hooks';
import { NotificationContext } from './NotificationContext';

const NotificationProvider = ({ children, container, delay }) => {
  const { notifications, dispatch } = useNotification();

  useEffect(() => {
    dispatcher({ dispatch, delay });

    return () => {
      emitter.off();
    };
  }, [dispatch, delay]);

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
