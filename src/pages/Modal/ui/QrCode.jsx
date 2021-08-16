import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from '@happysanta/router';
import { Button, ModalCard } from '@vkontakte/vkui';

import { MODAL_ENTER_CODE, PAGE_ROOM } from '@/app/router';
import vkapi from '@/shared/api';
import { Notification } from '@/shared/ui';
import { room } from '@/store';

const QrCode = ({ onClose, ...props }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onScan = async () => {
    try {
      const { code_data } = await vkapi.openCodeReader();
      const url = new URL(code_data);
      const hashParams = new URLSearchParams(url.hash.substring(1));
      const roomId = hashParams.get('roomId');

      if (roomId) {
        dispatch.sync(room.action.join({ roomId })).then(() => router.pushPage(PAGE_ROOM));
      }
    } catch ({ error_data }) {
      if (error_data?.error_reason === 'Unsupported platform') {
        toast.error(<Notification message='Ваше устройство не поддерживает сканирование QR-кодов.' type='error' />, {
          toastId: 'qr-unsupported',
        });
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
        <Button key='enter' size='l' mode='primary' stretched onClick={() => router.replaceModal(MODAL_ENTER_CODE)}>
          Ввести код
        </Button>,
      ]}
      actionsLayout='vertical'
    />
  );
};

export { QrCode };
