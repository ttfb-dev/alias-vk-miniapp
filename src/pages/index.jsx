import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation } from '@happysanta/router';
import { AppRoot, Root } from '@vkontakte/vkui';

import { VIEW_GAME, VIEW_MAIN } from '@/app/router';

import { Game } from './Game';
import { Main } from './Main';
import { Modal } from './Modal';

import './index.scss';

const Pages = () => {
  const location = useLocation();

  return (
    <AppRoot>
      <Root nav='app' activeView={location.getViewId()} modal={<Modal />}>
        <Main nav={VIEW_MAIN} />

        <Game nav={VIEW_GAME} />
      </Root>
      <ToastContainer
        position={toast.POSITION.TOP_CENTER}
        draggablePercent={50}
        draggableDirection='y'
        limit={3}
        hideProgressBar={true}
        newestOnTop={true}
        closeButton={false}
      />
    </AppRoot>
  );
};

export { Pages };
