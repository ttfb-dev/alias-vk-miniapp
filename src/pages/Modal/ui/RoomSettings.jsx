import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon20Info } from '@vkontakte/icons';
import {
  ANDROID,
  Button,
  Checkbox,
  Div,
  FormItem,
  FormLayout,
  IOS,
  MiniInfoCell,
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
  const stepDuration = useSelector((state) => state.room.settings.stepDuration);
  const scoreToWin = useSelector((state) => state.room.settings.scoreToWin);
  const takeOffScore = useSelector((state) => state.room.settings.takeOffScore);
  const settings = useSelector((state) => state.room.settings);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const ownerId = useSelector((state) => state.room.ownerId);

  const isOwner = useMemo(() => userId === ownerId, [userId, ownerId]);

  const [localStepDuration, setStepDuration] = useState(stepDuration);
  const [localScoreToWin, setScoreToWin] = useState(scoreToWin);
  const [localTakeOffScore, setTakeOffScore] = useState(takeOffScore);

  useMemo(() => {
    setStepDuration(stepDuration);
    setScoreToWin(scoreToWin);
  }, [scoreToWin, stepDuration]);

  const onSave = () => {
    dispatch
      .sync(
        room.action.updateSettings({
          settings: {
            ...settings,
            stepDuration: localStepDuration,
            scoreToWin: localScoreToWin,
            takeOffScore: localTakeOffScore,
          },
        }),
      )
      .finally(() => {
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
          <FormItem top={`Время раунда: ${localStepDuration} секунд`}>
            <Slider
              defaultValue={stepDuration}
              value={localStepDuration}
              min={30}
              max={90}
              step={5}
              disabled={!isOwner}
              onChange={setStepDuration}
            />
          </FormItem>
          <FormItem top={`Условие победы: ${localScoreToWin} очков`}>
            <Slider
              defaultValue={scoreToWin}
              value={localScoreToWin}
              min={30}
              max={90}
              step={5}
              disabled={!isOwner}
              onChange={setScoreToWin}
            />
          </FormItem>
          <FormItem>
            <Checkbox
              defaultChecked={takeOffScore}
              onChange={(e) => {
                setTakeOffScore(e.target.checked);
              }}
              disabled={!isOwner}
            >
              Вычитать очко за пропуск слова
            </Checkbox>
          </FormItem>
          <FormItem>
            {isOwner ? (
              <Button size='l' stretched onClick={onSave}>
                Сохранить
              </Button>
            ) : (
              <MiniInfoCell before={<Icon20Info />} textLevel='secondary' textWrap='full'>
                Только создатель комнаты может менять настройки
              </MiniInfoCell>
            )}
          </FormItem>
        </FormLayout>
      </Div>
    </ModalPage>
  );
};

export { RoomSettings };
