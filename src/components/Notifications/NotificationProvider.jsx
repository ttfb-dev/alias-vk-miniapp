import React, { useEffect } from 'react';
import { NotificationContext } from './NotificationContext';
import { NotificationRoot } from './components';

import { events, dispatcher, emitter } from './events';
import { useNotification } from './hooks';

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
