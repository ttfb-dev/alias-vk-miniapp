import { events, emitter, notifier } from './events';

const applyNotification = ({ ...notification }) => emitter.emit(events.SHOW, notifier({ ...notification }));

const notification = ({ ...data }) => applyNotification({ ...data, type: 'default' });

notification.success = ({ ...data }) => applyNotification({ ...data, type: 'success' });

notification.error = ({ ...data }) => applyNotification({ ...data, type: 'error' });

notification.info = ({ ...data }) => applyNotification({ ...data, type: 'info' });

notification.warn = ({ ...data }) => applyNotification({ ...data, type: 'warning' });

notification.hideAll = () => emitter.emit(events.HIDE_ALL);

export { notification };
