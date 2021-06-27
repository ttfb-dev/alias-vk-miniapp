import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon16InfoCirle, Icon28DonateOutline, Icon28UserAddOutline } from '@vkontakte/icons';
import {
  ANDROID,
  Div,
  Group,
  Header,
  List,
  MiniInfoCell,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  SimpleCell,
  Spacing,
  Switch,
  usePlatform,
  VKCOM,
} from '@vkontakte/vkui';

import { CustomIcon } from '@/components';
import { general, profile } from '@/store';

import styles from './index.module.scss';

const Sets = ({ onClose, ...props }) => {
  const platform = usePlatform();
  const dispatch = useDispatch();
  const sets = useSelector((state) => state.profile.sets);
  const availableSets = useSelector((state) => state.profile.availableSets);

  const onChange = useCallback(
    (set) => {
      if (set.status === 'active') {
        dispatch.sync(profile.action.deactivateSet({ datasetId: set.datasetId }));
      } else if (set.status === 'inactive') {
        dispatch.sync(profile.action.activateSet({ datasetId: set.datasetId }));
      }
    },
    [dispatch],
  );

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
        >
          Наборы слов
        </ModalPageHeader>
      }
    >
      <div className={styles.info}>
        <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
          Все ваши наборы будут доступны участникам комнаты на период игры.
        </MiniInfoCell>
        <Spacing separator size={12} />
      </div>

      <List>
        <Group>
          {sets.map((set) => (
            <SimpleCell
              key={set.datasetId}
              hasActive={false}
              hasHover={false}
              before={<CustomIcon type={set.icon} width={24} height={24} />}
              after={<Switch checked={set.status === 'active'} onChange={() => onChange(set)} />}
              description={set.description}
            >
              {set.name}
            </SimpleCell>
          ))}
        </Group>
        {!!availableSets.length && (
          <Group header={<Header mode='secondary'>Доступны</Header>}>
            {availableSets.map((set) => {
              let onClick = () => {};
              let ActionIcon = () => {};
              switch (set.type) {
                case 'subscribe':
                  onClick = () => dispatch(general.action.route({ activeModal: 'join-group' }));
                  ActionIcon = Icon28UserAddOutline;
                  break;
                case 'donut':
                  onClick = () => dispatch(general.action.route({ activeModal: 'donut' }));
                  ActionIcon = Icon28DonateOutline;
                  break;
                default:
                  break;
              }
              if (set.type === 'subscribe') {
              }
              return (
                <SimpleCell
                  key={set.datasetId}
                  hasActive={false}
                  hasHover={false}
                  before={<CustomIcon type={set.icon} fill={'rgb(160, 160, 160)'} width={24} height={24} />}
                  after={
                    <Div size='s' onClick={onClick}>
                      <ActionIcon />
                    </Div>
                  }
                  description={set.description}
                >
                  {set.name}
                </SimpleCell>
              );
            })}
          </Group>
        )}
      </List>
    </ModalPage>
  );
};

export { Sets };
