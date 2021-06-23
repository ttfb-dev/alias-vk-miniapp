import React from 'react';
import { useDispatch } from 'react-redux';
import { Icon20Info } from '@vkontakte/icons';
import { Button, Div, MiniInfoCell, ModalCard } from '@vkontakte/vkui';

import vkapi from '@/api';
import { notify } from '@/components';
import { queryStringParse } from '@/helpers';
import { general, room } from '@/store';

import styles from './index.module.scss';

const QrCode = ({ onClose, ...props }) => {
  const dispatch = useDispatch();

  const onScan = async () => {
    try {
      const code = await vkapi.openCodeReader();
      const url = new URL(code);
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
    <ModalCard {...props} onClose={onClose} header='Отсканируйте QR-код' subheader='или введите код комнаты'>
      <Div className={styles.actions}>
        <Button size='l' mode='primary' stretched onClick={onScan}>
          Сканировать
        </Button>
        <Button
          size='l'
          mode='primary'
          stretched
          onClick={() => dispatch(general.action.route({ activeModal: 'enter-code' }))}
        >
          Ввести
        </Button>
      </Div>
      <MiniInfoCell before={<Icon20Info />} textLevel='secondary' textWrap='full'>
        Код вы можете получить у создателя комнаты
      </MiniInfoCell>
    </ModalCard>
  );
};

export { QrCode };
