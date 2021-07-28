import { SimpleCell } from '@vkontakte/vkui';

import { CustomIcon } from '@/shared/ui';

export const SetRow = ({ set, action, onClick }) => (
  <SimpleCell
    key={set.id}
    hasActive={false}
    hasHover={false}
    before={<CustomIcon type={set.icon} width={24} height={24} />}
    after={action}
    description={set.description}
    onClick={onClick}
  >
    {set.name}
  </SimpleCell>
);
