import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalRoot } from '@vkontakte/vkui';

import { general } from '../../store';

import { CreateRoom } from './CreateRoom';
import { EnterCode } from './EnterCode';
import { QrCode } from './QrCode';
import { Rules } from './Rules';
import { ShareCode } from './ShareCode';
import { Teams } from './Teams';

const Modal = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.general.activeModal);

  return (
    <ModalRoot activeModal={activeModal} onClose={() => dispatch(general.action.route({ activeModal: null }))}>
      <QrCode id={'qr-code'} />

      <EnterCode id={'enter-code'} />

      <ShareCode id={'share-code'} />

      <CreateRoom id={'create-room'} />

      <Teams id={'teams'} />

      <Rules id={'rules'} />
    </ModalRoot>
  );
};

export { Modal };
