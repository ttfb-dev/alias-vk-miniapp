import React, { useEffect } from 'react';
import { NotificationContext } from './NotificationContext';
import { NotificationRoot } from './NotificationRoot';

import { events, dispatcher, emitter } from './events';
import { useNotification } from './hooks';

const NotificationProvider = ({ children, delay }) => {
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
      <NotificationRoot notifications={notifications} onClose={onClose} />
    </NotificationContext.Provider>
  );
};

export { NotificationProvider };
