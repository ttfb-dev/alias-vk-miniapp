import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Title,
  Headline,
  Div,
  Caption,
  Spacing,
  IconButton,
} from '@vkontakte/vkui';

import app from '../../services';
import { general, room } from '../../store';
import { ReactComponent as Logo } from '../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../assets/logo-bg.svg';
import { ReactComponent as Hourglass } from '../../assets/hourglass.svg';

import styles from './index.module.scss';

const Game = () => {
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
