import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from '@happysanta/router';
import { Icon20Dropdown } from '@vkontakte/icons';
import {
  CellButton,
  List,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderContent,
  PanelHeaderContext,
} from '@vkontakte/vkui';

import { ReactComponent as Logo } from '@/assets/logo-mini.svg';
import { POPOUT_GAME_LEAVE, POPOUT_ROOM_LEAVE } from '@/router';

export const Header = () => {
  const router = useRouter();
  const userId = useSelector((state) => state.general.userId);
  const teamsList = useSelector((state) => state.room.teamsList);
  const ownerId = useSelector((state) => state.room.ownerId);
  const settings = useSelector((state) => state.room.settings);
  const myTeamId = useSelector((state) => state.room.myTeamId);
  const status = useSelector((state) => state.room.status);
  const [isOpened, setIsOpened] = useState(false);

  const isOwner = useMemo(() => userId === ownerId, [userId, ownerId]);
  const isGameStarted = useMemo(() => status === 'game', [status]);

  const onRoomLeave = () => {
    setIsOpened(false);

    router.pushPopup(POPOUT_ROOM_LEAVE);
  };

  const onGameFinish = () => {
    setIsOpened(false);

    router.pushPopup(POPOUT_GAME_LEAVE);
  };

  return (
    <>
      <PanelHeader left={<PanelHeaderBack onClick={onRoomLeave} />} separator={false} shadow={true}>
        <PanelHeaderContent
          before={
            <div style={{ lineHeight: 0 }}>
              <Logo style={{ width: '32px', height: '32px', color: 'var(--header_tint)' }} />
            </div>
          }
          aside={<Icon20Dropdown style={{ transform: `rotate(${isOpened ? '180deg' : '0'})` }} />}
          status={!isGameStarted ? settings?.name : teamsList[myTeamId]?.name ?? 'Без названия'}
          onClick={() => setIsOpened(!isOpened)}
        >
          Игра
        </PanelHeaderContent>
      </PanelHeader>
      <PanelHeaderContext opened={isOpened} onClose={() => setIsOpened(!isOpened)}>
        <List>
          {isOwner && (
            <>
              {!isGameStarted && (
                <CellButton mode='primary' centered>
                  Настройки
                </CellButton>
              )}
              <CellButton mode='danger' centered onClick={onGameFinish}>
                Закончить игру
              </CellButton>
            </>
          )}
          <CellButton mode='danger' centered onClick={onRoomLeave}>
            Выйти из комнаты
          </CellButton>
        </List>
      </PanelHeaderContext>
    </>
  );
};
