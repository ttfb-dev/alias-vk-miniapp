import React from 'react';
import {
  usePlatform,
  ANDROID,
  VKCOM,
  IOS,
  PanelHeaderClose,
  ModalPage,
  ModalPageHeader,
  List,
  SimpleCell,
  Avatar,
  Switch,
  MiniInfoCell,
  Spacing,
  Button,
} from '@vkontakte/vkui';
import { Icon16InfoCirle, Icon24Dismiss } from '@vkontakte/icons';

import styles from './index.module.scss';

const Sets = ({ onClose, ...props }) => {
  const platform = usePlatform();

  return (
    <ModalPage
      {...props}
      onClose={onClose}
      header={
        <ModalPageHeader
          left={
            <>
              {(platform === ANDROID || platform === VKCOM) && (
                <PanelHeaderClose onClick={onClose}>Закрыть</PanelHeaderClose>
              )}
            </>
          }
          right={
            <>
              {platform === IOS && (
                <PanelHeaderClose onClick={onClose}>
                  <Icon24Dismiss />
                </PanelHeaderClose>
              )}
            </>
          }
        >
          Выбор команды
        </ModalPageHeader>
      }
    >
      <List>
        <SimpleCell hasActive={false} hasHover={false} before={<Avatar size={40} />} after={<Switch />}>
          Игорь Фёдоров
        </SimpleCell>
        <SimpleCell
          hasActive={false}
          hasHover={false}
          before={<Avatar size={40} />}
          after={
            <Button size='s' onClick={() => {}}>
              99₽
            </Button>
          }
        >
          Artur Stambultsian
        </SimpleCell>
      </List>

      <div className={styles.info}>
        <Spacing separator size={12} />
        <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
          Все ваши купленные словари будут доступны всем участникам комнаты на период игры.
        </MiniInfoCell>
      </div>
    </ModalPage>
  );
};

export { Sets };
