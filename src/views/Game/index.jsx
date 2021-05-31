import React, { useMemo } from 'react';
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
  List,
  SimpleCell,
  Avatar,
  FixedLayout,
  Button,
} from '@vkontakte/vkui';

import { general } from '../../store';
import { ReactComponent as Logo } from '../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../assets/logo-bg.svg';
import { ReactComponent as Hourglass } from '../../assets/hourglass.svg';

import styles from './index.module.scss';

const Game = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const teams = useSelector((state) => state.room.teams);
  const myTeamId = useSelector((state) => state.room.myTeamId);
  const ownerId = useSelector((state) => state.room.ownerId);
  const members = useSelector((state) => state.room.members);

  const myTeam = useMemo(() => {
    return teams.find((team) => team.teamId === myTeamId);
  }, [teams, myTeamId]);

  return (
    <Panel {...props}>
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

      <Div className={styles.subheaderWrapper}>
        {!!myTeam && (
          <Title level={2} weight='semibold' className={styles.subheader}>
            {`Команда «${myTeam.name}»`}
          </Title>
        )}
      </Div>

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.background} />
          <LogoBackground />
        </div>

        <Div className={styles.content}>
          <Div className={styles.roundWrapper}>
            <div>
              <Title level={2} weight='semibold' style={{ color: '#fff' }}>
                Текущий круг
              </Title>
              <Spacing size={4} />

              <Headline weight='regular' style={{ color: '#fff', opacity: 0.72 }}>
                Отыграли 3 из 4 команд
              </Headline>
              <Spacing size={20} />

              <Caption caps level={1} weight='semibold' className={styles.awaiting}>
                <Hourglass style={{ marginRight: '4px' }} />
                Ожидание хода
              </Caption>
              <Spacing size={12} />
            </div>

            <div className={styles.round}>
              <p>2</p>
            </div>
          </Div>
          <Div className={styles.teamWrapper}>
            <Title
              level={3}
              weight='bold'
              style={{ color: 'var(--text_subhead)', textAlign: 'center' }}
            >{`Ход команды «${teams[0].name}»`}</Title>
            <Spacing size={20} />
            <div className={styles.team}>
              <SimpleCell
                before={<Avatar size={40} src={members[0].photo_50} />}
                style={{ flex: 1, paddingLeft: 0, borderRight: '1px solid var(--content_tint_foreground)' }}
                description='объясняет'
              >
                Трисс
              </SimpleCell>
              <SimpleCell
                before={<Avatar size={40} src={members[0].photo_50} />}
                style={{ flex: 1, paddingRight: 0 }}
                description='угадывает'
              >
                Геральт
              </SimpleCell>
            </div>
          </Div>
          <Div className={styles.statistics}>
            <h4>команды</h4>
            <List>
              <SimpleCell>Пирожки</SimpleCell>
              <SimpleCell>Сладкте булочки</SimpleCell>
              <SimpleCell>Грызуны</SimpleCell>
              <SimpleCell>Славные молочники</SimpleCell>
              <SimpleCell>Дерзкие стесняши</SimpleCell>
            </List>
          </Div>
        </Div>
      </div>

      <div className={styles.fixedLayout}>
        {userId === ownerId && (
          <Div>
            <Button stretched mode='primary' size='l'>
              Начать ход
            </Button>
          </Div>
        )}
      </div>
    </Panel>
  );
};

export { Game };
