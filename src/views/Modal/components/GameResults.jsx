import React from 'react';
// import { useSelector } from 'react-redux';
import { ModalCard, Button, List, SimpleCell, Text } from '@vkontakte/vkui';
import { Icon24CupOutline } from '@vkontakte/icons';

import { ReactComponent as Trophy } from '../../../assets/trophy.svg';

import styles from './index.module.scss';

const GameResults = ({ onClose, ...props }) => {
  // const stepHistory = useSelector((state) => state.game.stepHistory);

  return (
    <ModalCard
      {...props}
      onClose={onClose}
      icon={<Icon24CupOutline width={72} height={72} />}
      header='Результаты игры'
      actions={
        <Button size='l' mode='primary' onClick={onClose}>
          Закрыть
        </Button>
      }
      actionsLayout='horizontal'
    >
      <List>
        <SimpleCell
          hasHover={false}
          hasActive={false}
          after={
            <div className={styles.score}>
              <Trophy />
              <Text weight='regular'>4223</Text>
            </div>
          }
        >
          Пирожки
        </SimpleCell>
        <SimpleCell
          hasHover={false}
          hasActive={false}
          after={
            <div className={styles.score}>
              <Trophy />
              <Text weight='regular'>433</Text>
            </div>
          }
        >
          Сладкие булочки
        </SimpleCell>
      </List>
    </ModalCard>
  );
};

export { GameResults };
