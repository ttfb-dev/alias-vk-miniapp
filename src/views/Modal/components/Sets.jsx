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
  Group,
  Header,
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
      <div className={styles.info}>
        <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
          Все ваши купленные словари будут доступны всем участникам комнаты на период игры.
        </MiniInfoCell>
        <Spacing separator size={12} />
      </div>

      <List>
        <Group>
          <SimpleCell
            hasActive={false}
            hasHover={false}
            before={<Avatar size={40} />}
            after={<Switch />}
            description='ahjsdjahsjdh ajshdj as'
          >
            Птицы
          </SimpleCell>
          <SimpleCell
            hasActive={false}
            hasHover={false}
            before={<Avatar size={40} />}
            after={<Switch />}
            description='ahjsdjahsjdh ajshdj as'
          >
            Города
          </SimpleCell>
          <SimpleCell
            hasActive={false}
            hasHover={false}
            before={<Avatar size={40} />}
            after={<Switch />}
            description='ahjsdjahsjdh ajshdj as'
          >
            Одежда
          </SimpleCell>
        </Group>
        <Group header={<Header mode='secondary'>Доступны</Header>}>
          <SimpleCell
            hasActive={false}
            hasHover={false}
            before={<Avatar size={40} />}
            after={
              <Button size='s' onClick={() => {}}>
                99₽
              </Button>
            }
            description='ahjs jahsjdh ajshdj as'
          >
            Транспорт
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
            description='ahjsd jahsjdh ajshdj as'
          >
            География
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
            description='ahjsdjah sjdh ajshdj as'
          >
            Страны
          </SimpleCell>
        </Group>
      </List>
    </ModalPage>
  );
};

export { Sets };
