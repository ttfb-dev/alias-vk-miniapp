import React, { useContext } from 'react';
import {
  ANDROID,
  IOS,
  VKCOM,
  usePlatform,
  ModalPageHeader,
  PanelHeaderButton,
  FormLayout,
  FormItem,
  Input,
} from '@vkontakte/vkui';
import { Icon24Cancel } from '@vkontakte/icons';

import { ViewContext } from '../../context';

const EnterCode = () => {
  const platform = usePlatform();
  const { setActiveModal } = useContext(ViewContext);

  return (
    <>
      <ModalPageHeader
        left={
          (platform === ANDROID || platform === VKCOM) && (
            <PanelHeaderButton onClick={() => setActiveModal(null)}>
              <Icon24Cancel />
            </PanelHeaderButton>
          )
        }
        right={
          platform === IOS && (
            <PanelHeaderButton onClick={() => setActiveModal(null)}>
              Отмена
            </PanelHeaderButton>
          )
        }
      >
        Присоединиться
      </ModalPageHeader>
      <FormLayout>
        <FormItem removePlaceholder="dsadasdaw">
          <Input type="text" />
        </FormItem>
      </FormLayout>
    </>
  );
};

export { EnterCode };
