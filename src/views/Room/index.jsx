import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import { general, room } from '../../store';

const Room = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (state.room.roomId === null) {
      dispatch(general.action.route({ activePanel: 'home' }));
    }
  }, [state.room.roomId]);

  return (
    <PanelHeader
      left={
        <PanelHeaderBack
          onClick={() => {
            dispatch.sync(room.action.leave());
          }}
        />
      }
    >
      Комната
    </PanelHeader>
  );
};

export { Room };
