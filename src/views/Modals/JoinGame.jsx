import React, { useContext } from 'react';
import { ActionSheet, ActionSheetItem } from '@vkontakte/vkui';

import { ViewContext } from '../../context';

const JoinGame = () => {
  const { popoutRootRef, setActiveModal, setIsPopout } =
    useContext(ViewContext);

  return (
    <ActionSheet
      toggleRef={popoutRootRef.current}
      onClose={() => {
        setIsPopout(false);
      }}
      iosCloseItem={
        <ActionSheetItem autoclose mode="cancel">
          Отменить
        </ActionSheetItem>
      }
    >
      <ActionSheetItem>Отсканировать QR-код</ActionSheetItem>
      <ActionSheetItem
        onClick={() => {
          setIsPopout(false);
          setActiveModal('enter-code');
        }}
      >
        Ввести код
      </ActionSheetItem>
    </ActionSheet>
  );
};

export { JoinGame };
