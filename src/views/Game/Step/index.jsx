import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { differenceInSeconds } from 'date-fns';
import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  PanelHeaderContext,
  PanelSpinner,
  Header,
  Title,
  Div,
  Group,
  Spacing,
  List,
  SimpleCell,
  CellButton,
  Button,
  Switch,
} from '@vkontakte/vkui';
import { Icon20Dropdown } from '@vkontakte/icons';

import { general } from '../../../store';
import { ReactComponent as Logo } from '../../../assets/logo-mini.svg';
import { ReactComponent as LogoBackground } from '../../../assets/logo-bg.svg';

import { useTimer } from '../hooks';
import { formatTime } from '../helpers';

import styles from './index.module.scss';

const Step = ({ isSubscribing, ...props }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const teamsList = useSelector((state) => state.room.teamsList);
  const myTeamId = useSelector((state) => state.room.myTeamId);
  const timestamp = useSelector((state) => state.game.timestamp);
  const step = useSelector((state) => state.game.step);
  const diffTime = differenceInSeconds(Date.now(), timestamp);
  const { time, status } = useTimer(60 - diffTime);
  const [isOpened, setIsOpened] = useState(false);

  const isExplainer = useMemo(() => {
    return userId === step?.explainerId;
  }, [userId, step]);

  const onExit = () => {
    setIsOpened(false);

    // dispatch.sync(room.action.leave());
    dispatch(general.action.route({ activeView: 'main', main: { activePanel: 'room' } }));
  };

  return (
    <Panel {...props}>
      <PanelHeader separator={false} shadow={true}>
        <PanelHeaderContent
          before={
            <div style={{ lineHeight: 0 }}>
              <Logo style={{ width: '28px', height: '28px', color: 'var(--header_tint)' }} />
            </div>
          }
          aside={
            <Icon20Dropdown
              style={{ transform: `rotate(${isOpened ? '180deg' : '0'})` }}
              onClick={() => setIsOpened(!isOpened)}
            />
          }
          status={(teamsList && teamsList[myTeamId]?.name) || 'Без названия'}
        >
          Игра
        </PanelHeaderContent>
      </PanelHeader>
      <PanelHeaderContext opened={isOpened} onClose={() => setIsOpened(!isOpened)}>
        <List>
          <CellButton mode='danger' centered onClick={onExit}>
            Выйти из игры
          </CellButton>
        </List>
      </PanelHeaderContext>

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.background} />
          <LogoBackground />
        </div>

        {isSubscribing ? (
          <PanelSpinner />
        ) : (
          <Div className={styles.content}>
            <Div className={clsx(styles.timerWrapper, status === 'STOPPED' && styles.timerBackground)}>
              <Title className={styles.title} level={1} weight='semibold'>
                Таймер
              </Title>
              <div className={styles.clock}>{formatTime(time)}</div>
            </Div>

            <Group mode='card' separator='hide'>
              <SimpleCell hasHover={false} hasActive={false} indicator='+25' onClick={() => {}}>
                Текущие очки
              </SimpleCell>
            </Group>

            <Group mode='card' separator='hide' header={<Header mode='tertiary'>Отыгравшие слова</Header>}>
              {false
                ? step?.words.map((word) => (
                    <SimpleCell
                      key={word.index}
                      hasActive={false}
                      hasHover={false}
                      after={<Switch disabled={status !== 'STOPPED'} checked={word.guessed} onChange={() => {}} />}
                    >
                      {word.word}
                    </SimpleCell>
                  ))
                : 'здесь будут слова'}
            </Group>
          </Div>
        )}

        <Spacing size={20} />
      </div>

      {!isSubscribing && (
        <div className={styles.fixedLayout}>
          {(isExplainer || true) && (
            <Div>
              <Button stretched mode='primary' size='l' onClick={() => {}}>
                Закончить ход
              </Button>
            </Div>
          )}
        </div>
      )}
    </Panel>
  );
};

export { Step };
