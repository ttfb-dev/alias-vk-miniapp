import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, ModalCard } from '@vkontakte/vkui';

import vkapi from '@/api';
import { notify } from '@/components';
import { queryStringParse } from '@/helpers';
import { general, room } from '@/store';

const QrCode = ({ onClose, ...props }) => {
  const dispatch = useDispatch();

  const onScan = async () => {
    try {
      const { code_data } = await vkapi.openCodeReader();
      const url = new URL(code_data);
      const hashParams = queryStringParse(url.hash);
      const roomId = parseInt(hashParams?.roomId, 10);

      if (roomId) {
        dispatch.sync(room.action.join({ roomId }));
      }
    } catch ({ error_type, error_data }) {
      if (error_data?.error_reason === 'Unsupported platform') {
        notify.error({ message: 'Ваше устройство не поддерживает сканирование QR-кодов.' });
      } else {
        notify.error({ message: 'Что-то пошло не так, попробуйте ещё раз отсканировать QR-код.' });
      }
    }
  };

  return (
    <ModalCard
      {...props}
      onClose={onClose}
      header='Отсканируйте QR-код'
      subheader='или введите код комнаты'
      actions={[
        <Button key='scan' size='l' mode='primary' stretched onClick={onScan}>
          Сканировать QR
        </Button>,
        <Button
          key='enter'
          size='l'
          mode='primary'
          stretched
          onClick={() => dispatch(general.action.route({ activeModal: 'enter-code' }))}
        >
          Ввести код
        </Button>,
      ]}
      actionsLayout='vertical'
    />
  );
};

export { QrCode };
