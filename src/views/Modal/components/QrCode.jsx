import React from 'react';
import { useDispatch } from 'react-redux';
import { ModalCard, Div, MiniInfoCell, Button } from '@vkontakte/vkui';
import { Icon16InfoCirle } from '@vkontakte/icons';

import vkapi from '../../../api';
import { queryStringParse } from '../../../helpers';
import { general, room } from '../../../store';

import styles from './index.module.scss';

const QrCode = ({ onClose, ...props }) => {
  const dispatch = useDispatch();

  return (
    <ModalCard {...props} onClose={onClose} header='Отсканируйте QR-код' subheader='или введите код комнаты'>
      <Div className={styles.actions}>
        <Button
          size='l'
          mode='primary'
          stretched
          onClick={async () => {
            const code = await vkapi.openCodeReader();
            const url = new URL(code);
            const hashParams = queryStringParse(url.hash);
            const roomId = parseInt(hashParams?.roomId, 10);

            if (roomId) {
              dispatch.sync(room.action.join({ roomId }));
            }
          }}
        >
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
      <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
        Код вы можете получить у создателя комнаты
      </MiniInfoCell>
    </ModalCard>
  );
};

export { QrCode };
