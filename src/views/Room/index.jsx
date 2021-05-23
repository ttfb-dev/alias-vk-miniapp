import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from '@logux/redux';
import { PanelHeader, PanelHeaderBack, PanelSpinner } from '@vkontakte/vkui';

import './index.scss';

import { general, room } from '../../store';
import { ReactComponent as Logo } from '../../assets/logo-mini.svg';

const Room = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const isSubscribing = useSubscription([`room/${state.room.roomId}`]);

  useEffect(() => {
    if (state.room.roomId === null) {
      dispatch(general.action.route({ activePanel: 'home' }));
    }
  }, [dispatch, state.room.roomId]);

  return (
    <>
      <PanelHeader
        left={
          <PanelHeaderBack
            onClick={() => {
              dispatch.sync(room.action.leave());
            }}
          />
        }
        separator={false}
      >
        <Logo />
      </PanelHeader>

      <div className='Room__background' />

      {isSubscribing ? <PanelSpinner /> : <div>комната</div>}
    </>
  );
};

export { Room };
