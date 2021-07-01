import React from 'react';
import { Panel } from '@vkontakte/vkui';

import { Container } from '@/components';

import Slider from './Slider';

const OnBoard = (props) => {
  return (
    <Panel {...props}>
      <Container>
        <Slider />
      </Container>
    </Panel>
  );
};

export { OnBoard };
