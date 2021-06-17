import { nanoid } from 'nanoid';

const notifier = ({ title, message, type }) => ({
  id: nanoid(),
  title,
  message,
  type,
});

export { notifier };
