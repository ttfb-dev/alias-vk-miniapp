import React from 'react';
import { useSelector } from 'react-redux';
import { Icon24CupOutline } from '@vkontakte/icons';
import { Button, List, ModalCard, SimpleCell, Text } from '@vkontakte/vkui';

import { ReactComponent as Trophy } from '@/assets/trophy.svg';

import styles from './index.module.scss';

const GameResults = ({ onClose, ...props }) => {
  const statistics = useSelector((state) => state.game.statistics);
  const teamsList = useSelector((state) => state.room.teamsList);

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
        {statistics.map((team) => (
          <SimpleCell
            key={team.id}
            hasHover={false}
            hasActive={false}
            after={
              <div className={styles.score}>
                <Trophy />
                <Text weight='regular'>{team.score}</Text>
              </div>
            }
          >
            {teamsList[team.id].name}
          </SimpleCell>
        ))}
      </List>
    </ModalCard>
  );
};

export { GameResults };
