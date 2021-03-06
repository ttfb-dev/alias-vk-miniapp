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

import { MODAL_ROOM_SETTINGS, POPOUT_GAME_LEAVE, POPOUT_ROOM_LEAVE } from '@/app/router';
import { ReactComponent as Logo } from '@/assets/logo-mini.svg';

export const Header = () => {
  const router = useRouter();
  const userId = useSelector((state) => state.general.userId);
  const teams = useSelector((state) => state.room.teams);
  const teamsList = useSelector((state) => state.room.teamsList);
  const ownerId = useSelector((state) => state.room.ownerId);
  const settings = useSelector((state) => state.room.settings);
  const status = useSelector((state) => state.room.status);
  const [isOpened, setIsOpened] = useState(false);

  const isOwner = useMemo(() => userId === ownerId, [userId, ownerId]);
  const isGameStarted = useMemo(() => status === 'game', [status]);
  const myTeamId = useMemo(
    () => teams.find((team) => team.memberIds.includes(userId))?.teamId ?? null,
    [teams, userId],
  );

  const onRoomLeave = () => {
    setIsOpened(false);

    router.pushPopup(POPOUT_ROOM_LEAVE);
  };

  const onGameFinish = () => {
    setIsOpened(false);

    router.pushPopup(POPOUT_GAME_LEAVE);
  };

  const onSettings = () => {
    setIsOpened(false);
    router.pushModal(MODAL_ROOM_SETTINGS);
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
          status={!isGameStarted ? settings?.name : teamsList[myTeamId]?.name ?? '?????? ????????????????'}
          onClick={() => setIsOpened(!isOpened)}
        >
          ????????
        </PanelHeaderContent>
      </PanelHeader>
      <PanelHeaderContext opened={isOpened} onClose={() => setIsOpened(!isOpened)}>
        <List>
          {isOwner && (
            <>
              {!isGameStarted && (
                <CellButton mode='primary' centered onClick={onSettings}>
                  ??????????????????
                </CellButton>
              )}
              {isGameStarted && (
                <CellButton mode='danger' centered onClick={onGameFinish}>
                  ?????????????????? ????????
                </CellButton>
              )}
            </>
          )}
          <CellButton mode='danger' centered onClick={onRoomLeave}>
            ?????????? ???? ??????????????
          </CellButton>
        </List>
      </PanelHeaderContext>
    </>
  );
};
