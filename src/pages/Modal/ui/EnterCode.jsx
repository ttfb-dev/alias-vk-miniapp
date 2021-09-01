import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Icon20Info } from '@vkontakte/icons';
import { Button, FormItem, FormLayout, Input, MiniInfoCell, ModalCard } from '@vkontakte/vkui';

import { PAGE_ROOM, router } from '@/app/router';
import { Notification } from '@/shared/ui';
import { room } from '@/store';

const EnterCode = ({ onClose, ...props }) => {
  const dispatch = useDispatch();
  const [roomId, setRoomId] = useState(null);
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const onJoin = () => {
    if (roomId) {
      try {
        dispatch.sync(room.action.join({ roomId, method: 'input' })).then(() => router.pushPage(PAGE_ROOM));
      } catch {
        toast.error(<Notification message='Комната не найдена' type='error' />);
      }
    }
  };

  const onChange = (e) => {
    const roomId = e.target.value;

    setRoomId(roomId);
  };

  return (
    <ModalCard
      {...props}
      onClose={onClose}
      header='Введите код'
      actions={
        <Button type='submit' size='l' mode='primary' stretched onClick={onJoin}>
          Присоединиться
        </Button>
      }
    >
      <FormLayout
        onSubmit={(e) => {
          e.preventDefault();

          onJoin();
        }}
      >
        <FormItem>
          <Input getRef={ref} align='center' placeholder='Номер комнаты' onChange={onChange} />
        </FormItem>
        <MiniInfoCell before={<Icon20Info />} textLevel='secondary' textWrap='full'>
          Код вы можете получить у участников комнаты
        </MiniInfoCell>
      </FormLayout>
    </ModalCard>
  );
};

export { EnterCode };
