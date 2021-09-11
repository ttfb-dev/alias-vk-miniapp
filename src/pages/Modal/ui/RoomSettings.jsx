import React, { useState } from 'react';
import {
  ANDROID,
  Button,
  Div,
  FormItem,
  FormLayout,
  IOS,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  PanelHeaderSubmit,
  Slider,
  usePlatform,
  VKCOM,
} from '@vkontakte/vkui';

const RoomSettings = ({ onClose, ...props }) => {
  const platform = usePlatform();

  const [roundDuration, setRoundDuration] = useState(60);
  const [roundScope, setRoundScope] = useState(60);

  return (
    <ModalPage
      {...props}
      onClose={onClose}
      header={
        <ModalPageHeader
          left={
            (platform === ANDROID || platform === VKCOM) && (
              <PanelHeaderClose onClick={onClose}>Закрыть</PanelHeaderClose>
            )
          }
          right={platform === IOS && <PanelHeaderSubmit onClick={onClose}>Закрыть</PanelHeaderSubmit>}
        >
          Настройки
        </ModalPageHeader>
      }
    >
      <Div>
        <FormLayout>
          <FormItem top={`Время раунда: ${roundDuration} секунд`}>
            <Slider defaultValue={60} min={30} max={90} step={5} onChange={setRoundDuration} />
          </FormItem>
          <FormItem top={`Очков для победы: ${roundScope}`}>
            <Slider defaultValue={60} min={30} max={90} step={5} onChange={setRoundScope} />
          </FormItem>
          <FormItem>
            <Button size='l' stretched onClick={onClose}>
              Сохранить
            </Button>
          </FormItem>
        </FormLayout>
      </Div>
    </ModalPage>
  );
};

export { RoomSettings };
