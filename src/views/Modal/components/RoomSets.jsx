import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { profile, room } from '../../../store';

import styles from './index.module.scss';

const RoomSets = ({ onClose, ...props }) => {
  const platform = usePlatform();
  const dispatch = useDispatch();
  const roomId = useSelector((state) => state.room.roomId);
  const sets = useSelector((state) => state.room.sets);
  const availableSets = useSelector((state) => state.room.availableSets);

  const onChange = useCallback(
    (set) => {
      if (set.status === 'active') {
        dispatch.sync(room.action.deactivateSet({ datasetId: set.datasetId, roomId }));
      } else if (set.status === 'inactive') {
        dispatch.sync(room.action.activateSet({ datasetId: set.datasetId, roomId }));
      }
    },
    [dispatch, roomId],
  );

  const onClick = useCallback(
    (setId) => {
      dispatch.sync(profile.action.buySet({ datasetId: setId }));
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
          Наборы слов
        </ModalPageHeader>
      }
    >
      <div className={styles.info}>
        <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
          Все ваши купленные наборы будут доступны участникам комнаты на период игры.
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
              before={<Avatar size={40} />}
              after={<Switch checked={set.status === 'active'} onChange={() => onChange(set)} />}
              description={set.description}
            >
              {set.name}
            </SimpleCell>
          ))}
        </Group>
        {!!availableSets.length && (
          <Group header={<Header mode='secondary'>Доступны</Header>}>
            {availableSets.map((set) => (
              <SimpleCell
                key={set.datasetId}
                hasActive={false}
                hasHover={false}
                before={<Avatar size={40} />}
                after={
                  <Button size='s' onClick={() => onClick(set.datasetId)}>
                    {set.price / 100} ₽
                  </Button>
                }
                description={set.description}
              >
                {set.name}
              </SimpleCell>
            ))}
          </Group>
        )}
      </List>
    </ModalPage>
  );
};

export { RoomSets };
