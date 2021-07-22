import React from 'react';
import { Icon20Info } from '@vkontakte/icons';
import {
  ANDROID,
  Button,
  Div,
  FormItem,
  FormLayout,
  Header,
  IOS,
  List,
  MiniInfoCell,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  PanelHeaderSubmit,
  SimpleCell,
  Slider,
  Spacing,
  Switch,
  usePlatform,
  VKCOM,
} from '@vkontakte/vkui';

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
          right={platform === IOS && <PanelHeaderSubmit onClick={onClose}>Закрыть</PanelHeaderSubmit>}
        >
          Создать комнату
        </ModalPageHeader>
      }
    >
      <div className={styles.info}>
        <Spacing separator size={12} />
        <MiniInfoCell before={<Icon20Info />} textLevel='secondary' textWrap='full'>
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
