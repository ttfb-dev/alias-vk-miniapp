import { nanoid } from 'nanoid';

import { emitter, events } from './emitter';

const notifier = ({ title, message, type, code }) => ({
  id: nanoid(),
  title,
  message,
  type,
  code,
});

const applyNotify = ({ ...notification }) => emitter.emit(events.SHOW, notifier({ ...notification }));

const notify = ({ ...data }) => applyNotify({ ...data, type: 'default' });

notify.success = ({ ...data }) => applyNotify({ ...data, type: 'success' });

notify.error = ({ ...data }) => applyNotify({ ...data, type: 'error', title: 'Ошибка' });

notify.info = ({ ...data }) => applyNotify({ ...data, type: 'info' });

notify.warn = ({ ...data }) => applyNotify({ ...data, type: 'warning' });

notify.hideAll = () => emitter.emit(events.HIDE_ALL);

export { notify };
