import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from '@logux/redux';
import { CardGrid, Card, Cell, Group, PanelHeader, PanelHeaderBack, PanelSpinner } from '@vkontakte/vkui';

import styles from './index.module.scss';

import { general, room } from '../../store';
import { ReactComponent as Logo } from '../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../assets/logo-bg.svg';

const Room = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const isSubscribing = useSubscription([`room/${state.room.roomId}`]);

  return (
    <>
      <PanelHeader
        left={
          <PanelHeaderBack
            onClick={() => {
              dispatch.sync(room.action.leave()).then(() => {
                dispatch(general.action.route({ activePanel: 'home' }));
              });
            }}
          />
        }
        separator={false}
      >
        <Logo />
      </PanelHeader>

      <div className={styles.container}>
        <div className={styles.background} />
        {/* <Background className={styles.background} /> */}
        <LogoBackground />
      </div>

      {isSubscribing ? (
        <PanelSpinner />
      ) : (
        <Group>
          <CardGrid size='m'>
            <Card mode='outline'>
              <Cell></Cell>
            </Card>
            <Card mode='outline'>
              <Cell></Cell>
            </Card>
            <Card mode='outline'>
              <Cell></Cell>
            </Card>
          </CardGrid>
        </Group>
      )}
    </>
  );
};

export { Room };
