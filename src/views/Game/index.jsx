import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Panel, PanelHeader, PanelHeaderBack, Title, Headline, Div, Caption, Spacing } from '@vkontakte/vkui';

import { general } from '../../store';
import { ReactComponent as Logo } from '../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../assets/logo-bg.svg';
import { ReactComponent as Hourglass } from '../../assets/hourglass.svg';

import styles from './index.module.scss';

const Game = () => {
  const dispatch = useDispatch();
  // const userId = useSelector((state) => state.general.userId);
  const teams = useSelector((state) => state.room.teams);
  const myTeamId = useSelector((state) => state.room.myTeamId);
  // const ownerId = useSelector((state) => state.room.ownerId);
  // const members = useSelector((state) => state.room.members);

  const myTeam = useMemo(() => {
    console.warn(teams, myTeamId);

    return teams.find((team) => team.teamId === myTeamId);
  }, [teams, myTeamId]);

  return (
    <Panel id='room'>
      <PanelHeader
        left={
          <PanelHeaderBack
            onClick={() => {
              dispatch(general.action.route({ activePanel: 'room' }));
            }}
          />
        }
        separator={false}
      >
        <Logo />
      </PanelHeader>
      <div className={styles.subheader}>
        {!!myTeam && (
          <Title level={2} weight='semibold'>
            Команда «{`${myTeam.name}`}»
          </Title>
        )}
      </div>

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.background} />
          <LogoBackground />
        </div>

        <Div>
          <Div className={styles.current}>
            <div>
              <Title level={2} weight='semibold' style={{ color: '#fff' }}>
                Текущий круг
              </Title>
              <Spacing size={4} />

              <Headline weight='regular' style={{ color: '#fff', opacity: 0.72 }}>
                Отыграли 3 из 4 команд
              </Headline>
              <Spacing size={20} />

              <Caption
                caps
                level={1}
                weight='semibold'
                style={{ color: '#fff', opacity: 0.5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}
              >
                <Hourglass style={{ marginRight: '4px' }} />
                Ожидание хода
              </Caption>
            </div>

            <div className={styles.round}>
              <p>2</p>
            </div>
          </Div>
          <Div></Div>
          <Div></Div>
        </Div>
      </div>
    </Panel>
  );
};

export { Game };
