import React, { useContext } from 'react';
import { PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import { ViewContext } from '../../context';

const Sets = () => {
  const { setActivePanel } = useContext(ViewContext);

  return (
    <PanelHeader
      left={<PanelHeaderBack onClick={() => setActivePanel('home')} />}
    >
      Наборы слов
    </PanelHeader>
  );
};

export { Sets };
