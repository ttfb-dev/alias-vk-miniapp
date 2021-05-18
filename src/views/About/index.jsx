import React, { useContext } from 'react';
import { PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import { ViewContext } from '../../context';

const About = () => {
  const { setActivePanel } = useContext(ViewContext);

  return (
    <PanelHeader
      left={<PanelHeaderBack onClick={() => setActivePanel('home')} />}
    >
      Об игре
    </PanelHeader>
  );
};

export { About };
