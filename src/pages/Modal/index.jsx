import React, { useCallback } from 'react';
import { useLocation, useRouter } from '@happysanta/router';
import { ModalRoot } from '@vkontakte/vkui';

import {
  MODAL_CREATE_ROOM,
  MODAL_DONUT,
  MODAL_ENTER_CODE,
  MODAL_GAME_RESULTS,
  MODAL_JOIN_GROUP,
  MODAL_MEMBERS,
  MODAL_QR_CODE,
  MODAL_ROOM_SETS,
  MODAL_RULES,
  MODAL_SETS,
  MODAL_SHARE_CODE,
  MODAL_TEAMS,
} from '@/app/router';

import {
  CreateRoom,
  Donut,
  EnterCode,
  GameResults,
  JoinGroup,
  Members,
  QrCode,
  RoomSets,
  Rules,
  Sets,
  ShareCode,
  Teams,
} from './ui';

const Modal = () => {
  const router = useRouter();
  const location = useLocation();

  const onClose = useCallback(() => router.popPage(), [router]);

  return (
    <ModalRoot activeModal={location.getModalId()} onClose={onClose}>
      <QrCode nav={MODAL_QR_CODE} onClose={onClose} />

      <EnterCode nav={MODAL_ENTER_CODE} onClose={onClose} />

      <ShareCode nav={MODAL_SHARE_CODE} onClose={onClose} dynamicContentHeight />

      <CreateRoom nav={MODAL_CREATE_ROOM} onClose={onClose} dynamicContentHeight />

      <Members nav={MODAL_MEMBERS} onClose={onClose} dynamicContentHeight settlingHeight={100} />

      <Teams nav={MODAL_TEAMS} onClose={onClose} dynamicContentHeight settlingHeight={100} />

      <Rules nav={MODAL_RULES} onClose={onClose} dynamicContentHeight settlingHeight={100} />

      <Sets nav={MODAL_SETS} onClose={onClose} dynamicContentHeight settlingHeight={100} />
      <RoomSets nav={MODAL_ROOM_SETS} onClose={onClose} dynamicContentHeight settlingHeight={100} />

      <GameResults nav={MODAL_GAME_RESULTS} onClose={onClose} />

      <JoinGroup nav={MODAL_JOIN_GROUP} />

      <Donut nav={MODAL_DONUT} />
    </ModalRoot>
  );
};

export { Modal };
