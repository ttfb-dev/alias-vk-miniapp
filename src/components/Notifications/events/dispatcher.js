import { emitter } from './emitter';

const events = {
  SHOW: 'show',
  HIDE: 'hide',
  HIDE_ALL: 'hideAll',
};

const dispatcher = ({ dispatch, delay }) => {
  emitter.on(events.SHOW, (notification) => {
    dispatch({ type: 'ADD', notification });

    if (delay) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE', id: notification.id });
      }, delay);
    }
  });

  emitter.on(events.HIDE, (id) => dispatch({ type: 'REMOVE', id }));

  emitter.on(events.HIDE_ALL, () => dispatch({ type: 'REMOVE_ALL' }));
};

export { events, dispatcher };
