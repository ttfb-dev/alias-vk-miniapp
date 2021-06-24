import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Group, Header, SimpleCell, Spacing } from '@vkontakte/vkui';

import './Team.scss';
import styles from './Team.module.scss';

export const Team = () => {
  const membersList = useSelector((state) => state.room.membersList);
  const teamsList = useSelector((state) => state.room.teamsList);
  const step = useSelector((state) => state.game.step);

  return (
    <Group mode='card' separator='hide' className={styles.container}>
      <Header mode='tertiary' className='headerCentered'>
        {`Ход команды «${teamsList[step?.teamId]?.name ?? 'Без названия'}»`}
      </Header>
      <Spacing size={20} />
      <div className={styles.team}>
        <SimpleCell
          hasHover={false}
          hasActive={false}
          before={<Avatar size={40} src={membersList[step?.explainerId]?.photo_50 ?? null} />}
          style={{ flex: 1, borderRight: '1px solid var(--content_tint_foreground)' }}
          description='объясняет'
        >
          {membersList[step?.explainerId]?.first_name ?? 'Без имени'}
        </SimpleCell>
        <SimpleCell
          hasHover={false}
          hasActive={false}
          before={<Avatar size={40} src={membersList[step?.guesserId]?.photo_50 ?? null} />}
          style={{ flex: 1 }}
          description='угадывает'
        >
          {membersList[step?.guesserId]?.first_name ?? 'Без имени'}
        </SimpleCell>
      </div>
    </Group>
  );
};
