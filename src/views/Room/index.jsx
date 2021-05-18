import React, { useContext } from 'react';
import { PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import { ViewContext } from '../../context';

const Room = () => {
  const { setActivePanel } = useContext(ViewContext);

  return (
    <PanelHeader
      left={<PanelHeaderBack onClick={() => setActivePanel('home')} />}
    >
      Комната
    </PanelHeader>
  );
};

export { Room };
