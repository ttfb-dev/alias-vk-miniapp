import React from 'react';
import { useDispatch } from 'react-redux';
import { ModalCard, FormLayout, FormItem, Input, MiniInfoCell, Button } from '@vkontakte/vkui';
import { Icon16InfoCirle } from '@vkontakte/icons';

import { general } from '../../../store';

const EnterCode = () => {
  const dispatch = useDispatch();

  return (
    <ModalCard
      id='enter-code'
      onClose={() => dispatch(general.action.route({ activeModal: null }))}
      header='Введите код'
    >
      <FormLayout>
        <FormItem>
          <Input type='text' align='center' />
        </FormItem>
        <FormItem>
          <Button type='submit' size='l' mode='primary' stretched>
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
