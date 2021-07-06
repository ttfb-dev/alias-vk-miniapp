import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from '@happysanta/router';
import { Icon16Add, Icon28InfoOutline, Icon28ScanViewfinderOutline, Icon28WorkOutline } from '@vkontakte/icons';
import { Badge, Button, Div, Panel, Spacing, Tabbar, TabbarItem, Tooltip } from '@vkontakte/vkui';

import vkapi from '@/api';
import { ReactComponent as Logo } from '@/assets/logo.svg';
import { CustomUsersStack, notify } from '@/components';
import { MODAL_QR_CODE, MODAL_RULES, MODAL_SETS, PAGE_ROOM } from '@/router';
import AppService from '@/services';
import { room } from '@/store';

import styles from './index.module.scss';

const Home = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.general.friends.map((friend) => friend.photo_50));
  const firstNames = useSelector((state) => state.general.friends.map((friend) => friend.first_name));

  const [tooltipIndex, setTooltipIndex] = useState(AppService.getTooltipIndex('homeTooltipIndex'));

  const onTooltipClose = (index) => {
    AppService.setTooltipIndex('homeTooltipIndex', index);

    setTooltipIndex(index);
  };

  const onScanQR = async () => {
    try {
      const { code_data } = await vkapi.openCodeReader();
      const url = new URL(code_data);
      const hashParams = new URLSearchParams(url.hash.substring(1));
      const roomId = parseInt(hashParams.get('roomId'), 10);

      if (roomId) {
        dispatch.sync(room.action.join({ roomId }));
      }
    } catch ({ error_data }) {
      if (error_data?.error_reason === 'Unsupported platform') {
        notify.error({ message: 'Ваше устройство не поддерживает сканирование QR-кодов.', code: 'qr-unsupported' });
      }
    }
  };

  const onCreate = () => dispatch.sync(room.action.create()).then(() => router.pushPage(PAGE_ROOM));

  const tabbar = (
    <Tabbar>
      <TabbarItem
        onClick={() => {
          if (tooltipIndex === 3) {
            return;
          }

          router.pushModal(MODAL_SETS, { from: 'profile' });
        }}
        indicator={<Badge mode='prominent' />}
        selected
        text='Наборы слов'
      >
        <Tooltip
          isShown={tooltipIndex === 3}
          onClose={() => onTooltipClose(4)}
          alignY='top'
          alignX='left'
          offsetX={-15}
          mode='light'
          text='Тут ты найдёшь все наборы слов, доступные для игры.'
        >
          <Icon28WorkOutline />
        </Tooltip>
      </TabbarItem>
      <TabbarItem onClick={onScanQR} selected text='QR-код'>
        <Icon28ScanViewfinderOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => {
          router.pushModal(MODAL_RULES);
        }}
        selected
        text='Правила'
      >
        <Icon28InfoOutline />
      </TabbarItem>
    </Tabbar>
  );

  return (
    <Panel {...props}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.background} />
          <Logo className={styles.logo} />

          <Spacing size={64} />

          <CustomUsersStack photos={photos} firstNames={firstNames} size='m' visibleCount={3} layout='vertical' />
        </div>
      </div>

      <div className={styles.fixedLayout}>
        <Div>
          <Tooltip
            isShown={tooltipIndex === 1}
            onClose={() => onTooltipClose(2)}
            alignX='left'
            alignY='top'
            offsetX={window.innerWidth / 2 - 132}
            cornerOffset={88}
            mode='light'
            text='Создай комнату и позови в неё друзей, чтобы начать игру.'
          >
            <Button onClick={onCreate} mode='primary' size='l' stretched>
              Создать комнату
            </Button>
          </Tooltip>
          <Spacing size={12} />
          <Tooltip
            isShown={tooltipIndex === 2}
            onClose={() => onTooltipClose(3)}
            alignX='left'
            alignY='top'
            offsetX={window.innerWidth / 2 - 132}
            offsetY={7}
            cornerOffset={88}
            mode='light'
            text='Или присоединись, если кто-то уже создал. :)'
          >
            <Button
              onClick={() => router.pushModal(MODAL_QR_CODE)}
              mode='secondary'
              size='l'
              stretched
              before={<Icon16Add />}
            >
              Присоединиться
            </Button>
          </Tooltip>
        </Div>
      </div>

      {tabbar}
    </Panel>
  );
};

export { Home };
