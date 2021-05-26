import React from 'react';
import { useDispatch } from 'react-redux';
import {
  usePlatform,
  ANDROID,
  VKCOM,
  IOS,
  PanelHeaderClose,
  ModalPage,
  ModalPageHeader,
  Div,
  List,
  MiniInfoCell,
} from '@vkontakte/vkui';
import { Icon16InfoCirle, Icon24Dismiss } from '@vkontakte/icons';

import { general } from '../../../store';

const Teams = () => {
  const platform = usePlatform();
  const dispatch = useDispatch();

  return (
    <ModalPage
      id='teams'
      onClose={() => dispatch(general.action.route({ activeModal: null }))}
      header={
        <ModalPageHeader
          left={
            (platform === ANDROID || platform === VKCOM) && (
              <PanelHeaderClose onClick={() => dispatch(general.action.route({ activeModal: null }))}>
                Закрыть
              </PanelHeaderClose>
            )
          }
          right={
            platform === IOS && (
              <PanelHeaderClose onClick={() => dispatch(general.action.route({ activeModal: null }))}>
                <Icon24Dismiss />
              </PanelHeaderClose>
            )
          }
        >
          Выбор команды
        </ModalPageHeader>
      }
      settlingHeight={100}
    >
      <Div>
        <List style={{ flex: 1 }}>123</List>
        <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
          Для начала нужно 4 и более участников. После начала игры присоединиться новым участникам будет нельзя.
        </MiniInfoCell>
      </Div>
    </ModalPage>
  );
};

export { Teams };
