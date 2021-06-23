import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon16InfoCirle, Icon24Dismiss } from '@vkontakte/icons';
import {
  ANDROID,
  Avatar,
  Button,
  Group,
  Header,
  IOS,
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

import { profile } from '@/store';

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

  const onClick = (id) => {
    dispatch.sync(profile.action.buySet({ datasetId: id }));
  };

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

export { Sets };
