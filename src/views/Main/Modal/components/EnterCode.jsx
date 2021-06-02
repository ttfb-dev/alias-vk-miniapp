import React from 'react';
import { ModalCard, FormLayout, FormItem, Input, MiniInfoCell, Button } from '@vkontakte/vkui';
import { Icon16InfoCirle } from '@vkontakte/icons';

const EnterCode = ({ onClose, ...props }) => (
  <ModalCard {...props} onClose={onClose} header='Введите код'>
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

export { EnterCode };
