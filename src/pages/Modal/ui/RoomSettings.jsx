import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { room } from '@/store';

const RoomSettings = ({ onClose, ...props }) => {
  const platform = usePlatform();
  const settings = useSelector((state) => state.room.settings);
  const dispatch = useDispatch();

  const [stepDuration, setStepDuration] = useState(settings.stepDuration);
  const [pointsToWin, setPointsToWin] = useState(settings.pointsToWin);

  const onSave = () => {
    dispatch.sync(room.action.updateSettings({ settings: { ...settings, stepDuration, pointsToWin } })).finally(() => {
      onClose();
    });
  };

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
          <FormItem top={`Время раунда: ${stepDuration} секунд`}>
            <Slider defaultValue={settings.stepDuration} min={30} max={90} step={5} onChange={setStepDuration} />
          </FormItem>
          <FormItem top={`Условие победы: ${pointsToWin} очков`}>
            <Slider defaultValue={settings.pointsToWin} min={30} max={90} step={5} onChange={setPointsToWin} />
          </FormItem>
          <FormItem>
            <Button size='l' stretched onClick={onSave}>
              Сохранить
            </Button>
          </FormItem>
        </FormLayout>
      </Div>
    </ModalPage>
  );
};

export { RoomSettings };
