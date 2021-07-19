import React from 'react';
import { useSelector } from 'react-redux';
import { Icon24CupOutline } from '@vkontakte/icons';
import { Group, Header, List, Placeholder, SimpleCell, Text } from '@vkontakte/vkui';

import { ReactComponent as Trophy } from '@/assets/trophy.svg';

import styles from './Statistics.module.scss';

export const Statistics = () => {
  const teamsList = useSelector((state) => state.room.teamsList);
  const statistics = useSelector((state) => state.game.statistics);

  return (
    <Group mode='card' separator='hide' className={styles.container}>
      <Header mode='primary'>Команды</Header>
      {!!statistics.length ? (
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
      ) : (
        <Placeholder icon={<Icon24CupOutline width={48} height={48} />}>
          Здесь будет вестить статистика команд
        </Placeholder>
      )}
    </Group>
  );
};
