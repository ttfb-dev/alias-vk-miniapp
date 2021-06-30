import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRouter } from '@happysanta/router';
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
  SimpleCell,
  Spacing,
  Switch,
  usePlatform,
  VKCOM,
} from '@vkontakte/vkui';

import { CustomIcon } from '@/components';
import { MODAL_DONUT, MODAL_JOIN_GROUP } from '@/router';
import { profile, room } from '@/store';

import styles from './index.module.scss';

const Sets = ({ onClose, ...props }) => {
  const router = useRouter();
  const platform = usePlatform();
  const dispatch = useDispatch();
  const roomId = useSelector((state) => state.room.roomId);
  const userId = useSelector((state) => state.general.userId);
  const ownerId = useSelector((state) => state.room.ownerId);
  const from = useLocation().getParams()?.from ?? '';
  const sets = useSelector((state) => state[from]?.sets ?? []);
  const availableSets = useSelector((state) => state[from]?.availableSets ?? []);

  const isOwner = useMemo(() => userId === ownerId, [userId, ownerId]);
  const isRoom = useMemo(() => from === 'room', [from]);
  const isProfile = useMemo(() => from === 'profile', [from]);

  const onChange = useCallback(
    (set) => {
      if (isRoom) {
        if (set.status === 'active') {
          dispatch.sync(room.action.deactivateSet({ datasetId: set.datasetId, roomId }));
        } else if (set.status === 'inactive') {
          dispatch.sync(room.action.activateSet({ datasetId: set.datasetId, roomId }));
        }
      } else if (isProfile) {
        if (set.status === 'active') {
          dispatch.sync(profile.action.deactivateSet({ datasetId: set.datasetId }));
        } else if (set.status === 'inactive') {
          dispatch.sync(profile.action.activateSet({ datasetId: set.datasetId }));
        }
      }
    },
    [dispatch, isProfile, isRoom, roomId],
  );

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
          {sets.map((set) => (
            <SimpleCell
              key={set.datasetId}
              hasActive={false}
              hasHover={false}
              before={<CustomIcon type={set.icon} width={24} height={24} />}
              after={
                <Switch
                  disabled={isRoom && !isOwner}
                  checked={set.status === 'active'}
                  onChange={() => onChange(set)}
                />
              }
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
              return (
                <SimpleCell
                  key={set.datasetId}
                  hasActive={false}
                  hasHover={false}
                  before={<CustomIcon type={set.icon} fill={'rgb(160, 160, 160)'} width={24} height={24} />}
                  after={<ActionIcon onClick={onClick} />}
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
