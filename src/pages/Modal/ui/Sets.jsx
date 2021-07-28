import React from 'react';
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

import { MODAL_JOIN_GROUP } from '@/app/router';
import { setModel, SetRow } from '@/entities/set';
import { subscriptionService } from '@/shared/services/subscription';

import styles from './index.module.scss';

export const Sets = ({ onClose, ...props }) => {
  const router = useRouter();
  const platform = usePlatform();

  const purchasedSets = setModel.selectors.usePurchasedSets();
  const availableSets = setModel.selectors.useAvailableSets();

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
                <Switch checked={set.status === 'active'} onChange={() => setModel.actions.toggleSet(set.datasetId)} />
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
                  onClick = () => subscriptionService.create();
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
