import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModalCard, FormLayout, FormItem, Input, MiniInfoCell, Button } from '@vkontakte/vkui';
import { Icon16InfoCirle } from '@vkontakte/icons';

import { room } from '../../../store';

const EnterCode = ({ onClose, ...props }) => {
  const dispatch = useDispatch();
  const [roomId, setRoomId] = useState(null);

  const onJoin = () => {
    if (roomId) {
      dispatch.sync(room.action.join({ roomId })).catch(() => onClose());
    }
  };

  const onChange = (e) => {
    const roomId = parseInt(e.target.value, 10);

    setRoomId(roomId);
  };

  return (
    <ModalCard {...props} onClose={onClose} header='Введите код'>
      <FormLayout>
        <FormItem>
          <Input type='number' inputMode='numeric' align='center' placeholder='Номер комнаты' onChange={onChange} />
        </FormItem>
        <FormItem>
          <Button type='submit' size='l' mode='primary' stretched onClick={onJoin}>
            Присоединиться
          </Button>
        </FormItem>
      </FormLayout>
      <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
        Код вы можете получить у создателя комнаты
      </MiniInfoCell>
    </ModalCard>
  );
};

export { EnterCode };
