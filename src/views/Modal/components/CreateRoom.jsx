import React from 'react';
import {
  usePlatform,
  ANDROID,
  VKCOM,
  IOS,
  PanelHeaderClose,
  ModalPage,
  ModalPageHeader,
  Div,
  FormLayout,
  FormItem,
  Header,
  List,
  SimpleCell,
  Slider,
  Switch,
  Button,
  MiniInfoCell,
  Spacing,
} from '@vkontakte/vkui';
import { Icon16InfoCirle, Icon24Dismiss } from '@vkontakte/icons';

import styles from './index.module.scss';

const CreateRoom = ({ onClose, ...props }) => {
  const platform = usePlatform();

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
          right={
            platform === IOS && (
              <PanelHeaderClose onClick={onClose}>
                <Icon24Dismiss />
              </PanelHeaderClose>
            )
          }
        >
          Создать комнату
        </ModalPageHeader>
      }
    >
      <div className={styles.info}>
        <Spacing separator size={12} />
        <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
          После создания комнаты вы сможете предоставить код остальным участникам
        </MiniInfoCell>
      </div>

      <Div>
        <FormLayout>
          <Header mode='secondary'>Настройки</Header>
          <List>
            <SimpleCell disabled after={<Switch defaultChecked />}>
              Использовать свои словари
            </SimpleCell>
            <SimpleCell disabled after={<Switch />}>
              Разрешить подсказки
            </SimpleCell>
          </List>
          <FormItem top='Время раунда'>
            <Slider defaultValue={60} min={20} max={90} step={1} />
          </FormItem>

          <FormItem>
            <Button size='l' stretched>
              Создать
            </Button>
          </FormItem>
        </FormLayout>
      </Div>
    </ModalPage>
  );
};

export { CreateRoom };
