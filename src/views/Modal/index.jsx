import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalRoot } from '@vkontakte/vkui';

import { general } from '@/store';

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
} from './components';

const Modal = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.general.activeModal);

  const onClose = useCallback(() => dispatch(general.action.route({ activeModal: null })), [dispatch]);

  return (
    <ModalRoot activeModal={activeModal} onClose={onClose}>
      <QrCode id={'qr-code'} onClose={onClose} />

      <EnterCode id={'enter-code'} onClose={onClose} />

      <ShareCode id={'share-code'} onClose={onClose} dynamicContentHeight />

      <CreateRoom id={'create-room'} onClose={onClose} dynamicContentHeight />

      <Members id={'members'} onClose={onClose} dynamicContentHeight settlingHeight={100} />

      <Teams id={'teams'} onClose={onClose} dynamicContentHeight settlingHeight={100} />

      <Rules id={'rules'} onClose={onClose} dynamicContentHeight settlingHeight={100} />

      <Sets id={'sets'} onClose={onClose} dynamicContentHeight settlingHeight={100} />

      <RoomSets id={'room-sets'} onClose={onClose} dynamicContentHeight settlingHeight={100} />

      <GameResults id={'game-results'} onClose={onClose} />

      <JoinGroup id={'join-group'} onClose={onClose} />

      <Donut id={'donut'} onClose={onClose} />
    </ModalRoot>
  );
};

export { Modal };
