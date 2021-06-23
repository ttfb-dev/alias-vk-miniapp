import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon20Info } from '@vkontakte/icons';
import { Button, FormItem, FormLayout, Input, MiniInfoCell, ModalCard } from '@vkontakte/vkui';

import { room } from '@/store';

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
      <MiniInfoCell before={<Icon20Info />} textLevel='secondary' textWrap='full'>
        Код вы можете получить у участников комнаты
      </MiniInfoCell>
    </ModalCard>
  );
};

export { EnterCode };
