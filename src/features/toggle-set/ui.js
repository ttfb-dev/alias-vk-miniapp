import { Switch } from '@vkontakte/vkui';

import { toggleSet } from './model';

export const ToggleSet = ({ set, disabled }) => {
  const onChange = (set) => toggleSet(set);

  return <Switch disabled={disabled} checked={set.status === 'active'} onChange={() => onChange(set)} />;
};
