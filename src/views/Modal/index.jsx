import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalRoot } from '@vkontakte/vkui';

import { general } from '../../store';

import { CreateRoom, EnterCode, QrCode, Rules, ShareCode, Teams } from './components';

const Modal = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.general.activeModal);

  const onClose = useCallback(() => dispatch(general.action.route({ activeModal: null })), [dispatch]);

  return (
    <ModalRoot activeModal={activeModal} onClose={onClose}>
      <QrCode id={'qr-code'} onClose={onClose} />

      <EnterCode id={'enter-code'} onClose={onClose} />

      <ShareCode id={'share-code'} onClose={onClose} dynamicContentHeight settlingHeight={100} />

      <CreateRoom id={'create-room'} onClose={onClose} dynamicContentHeight />

      <Teams id={'teams'} onClose={onClose} dynamicContentHeight settlingHeight={100} />

      <Rules id={'rules'} onClose={onClose} dynamicContentHeight />
    </ModalRoot>
  );
};

export { Modal };
