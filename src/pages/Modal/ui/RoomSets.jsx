import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from '@happysanta/router';
import { Icon16InfoCirle, Icon28DonateOutline, Icon28UserAddOutline } from '@vkontakte/icons';
import {
  ANDROID,
  Group,
  Header,
  IOS,
  List,
  MiniInfoCell,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  PanelHeaderSubmit,
  Spacing,
  Switch,
  usePlatform,
  VKCOM,
} from '@vkontakte/vkui';

import { MODAL_DONUT, MODAL_JOIN_GROUP } from '@/app/router';
import { roomSetModel } from '@/entities/room-set';
import { SetRow } from '@/entities/set';

import styles from './index.module.scss';

export const RoomSets = ({ onClose, ...props }) => {
  const router = useRouter();
  const platform = usePlatform();
  const userId = useSelector((state) => state.general.userId);
  const ownerId = useSelector((state) => state.room.ownerId);

  const isOwner = useMemo(() => userId === ownerId, [userId, ownerId]);

  const purchasedSets = roomSetModel.selectors.usePurchasedSets();
  const availableSets = roomSetModel.selectors.useAvailableSets();

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
          {purchasedSets.map((set) => (
            <SetRow
              key={set.datasetId}
              set={set}
              action={
                <Switch
                  checked={set.status === 'active'}
                  disabled={!isOwner}
                  onChange={() => roomSetModel.actions.toggleSet(set.datasetId)}
                />
              }
            />
          ))}
        </Group>
        {!!availableSets.length && (
          <Group header={<Header mode='secondary'>Доступны</Header>}>
            {availableSets.map((set) => {
              let onClick = () => {};
              let ActionIcon = () => {};
              switch (set.type) {
                case 'subscribe':
                  onClick = () => router.pushModal(MODAL_JOIN_GROUP);
                  ActionIcon = Icon28UserAddOutline;
                  break;
                case 'donut':
                  onClick = () => router.pushModal(MODAL_DONUT);
                  ActionIcon = Icon28DonateOutline;
                  break;
                default:
                  break;
              }
              return <SetRow key={set.datasetId} set={set} action={<ActionIcon />} onClick={onClick} />;
            })}
          </Group>
        )}
      </List>
    </ModalPage>
  );
};
