import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Panel, PanelHeader, PanelHeaderBack, Group, Title, Div } from '@vkontakte/vkui';

import app from '../../services';
import { general, room } from '../../store';
import { ReactComponent as Logo } from '../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../assets/logo-bg.svg';

import styles from './index.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const teams = useSelector((state) => state.room.teams);
  const roomId = useSelector((state) => state.room.roomId);
  const myTeamId = useSelector((state) => state.room.myTeamId);
  const ownerId = useSelector((state) => state.room.ownerId);
  const memberIds = useSelector((state) => state.room.memberIds);

  return (
    <Panel id='room'>
      <PanelHeader
        left={
          <PanelHeaderBack
            onClick={() => {
              dispatch.sync(room.action.leave());
              dispatch(general.action.route({ activePanel: 'home' }));
            }}
          />
        }
        separator={false}
      >
        <Logo />
      </PanelHeader>
      <div className={styles.subheader}>
        <Title level={2} weight='semibold'>
          Команда «{``}»
        </Title>
      </div>

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.background} />
          <LogoBackground />
        </div>

        <Group>
          <Div></Div>
          <Div></Div>
          <Div></Div>
        </Group>
      </div>
    </Panel>
  );
};

export { Home };
