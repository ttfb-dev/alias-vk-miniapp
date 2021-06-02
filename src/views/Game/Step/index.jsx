import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Panel, PanelHeader, PanelHeaderContent } from '@vkontakte/vkui';

import { ReactComponent as Logo } from '../../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../../assets/logo-bg.svg';

import styles from './index.module.scss';

const Step = (props) => {
  const teams = useSelector((state) => state.room.teams);
  const myTeamId = useSelector((state) => state.room.myTeamId);

  const myTeam = useMemo(() => {
    return teams.find((team) => team.teamId === myTeamId);
  }, [teams, myTeamId]);

  return (
    <Panel {...props}>
      <PanelHeader separator={false} shadow={true}>
        <PanelHeaderContent
          before={
            <div style={{ lineHeight: 0 }}>
              <Logo style={{ width: '28px', height: '28px', color: 'var(--header_tint)' }} />
            </div>
          }
          status={myTeam?.name}
        >
          Игра
        </PanelHeaderContent>
      </PanelHeader>

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.background} />
          <LogoBackground />
        </div>
      </div>
    </Panel>
  );
};

export { Step };
