import React, { useContext } from 'react';
import { PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import { ViewContext } from '../../context';

const Set = () => {
  const { setActiveView } = useContext(ViewContext);

  return (
    <PanelHeader
      left={<PanelHeaderBack onClick={() => setActiveView('home')} />}
    >
      Наборы слов
    </PanelHeader>
  );
};

export { Set };
