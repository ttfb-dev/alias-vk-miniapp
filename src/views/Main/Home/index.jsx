import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon16Add, Icon28InfoOutline, Icon28ScanViewfinderOutline, Icon28WorkOutline } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import { isNumeric } from '@vkontakte/vkjs';
import { Badge, Button, Div, Panel, Spacing, Tabbar, TabbarItem, Tooltip } from '@vkontakte/vkui';

import vkapi from '@/api';
import { ReactComponent as Logo } from '@/assets/logo.svg';
import { CustomUsersStack, notify } from '@/components';
import { queryStringParse } from '@/helpers';
import { general, room } from '@/store';

import styles from './index.module.scss';

const Home = (props) => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.general.friends.map((friend) => friend.photo_50));
  const firstNames = useSelector((state) => state.general.friends.map((friend) => friend.first_name));

  const [showTooltipIndex, setShowTooltipIndex] = useState(0);

  useEffect(() => {
    bridge.send('VKWebAppStorageGet', { keys: ['showMainTooltipIndex'] }).then((result) => {
      const value = result.keys[0].value;
      const index = isNumeric(value) ? parseInt(value) : 1;
      setShowTooltipIndex(index);
    });
  }, []);

  const onTooltipClose = (next) => {
    bridge.send('VKWebAppStorageSet', { key: 'showMainTooltipIndex', value: String(next) }).then(() => {
      setShowTooltipIndex(next);
    });
  };

  const onRoute = (route) => dispatch(general.action.route(route));

  const onScanQR = async () => {
    try {
      const { code_data } = await vkapi.openCodeReader();
      const url = new URL(code_data);
      const hashParams = queryStringParse(url.hash);
      const roomId = parseInt(hashParams?.roomId, 10);

      if (roomId) {
        dispatch.sync(room.action.join({ roomId }));
      }
    } catch ({ error_type, error_data }) {
      if (error_data?.error_reason === 'Unsupported platform') {
        notify.error({ message: 'Ваше устройство не поддерживает сканирование QR-кодов.' });
      } else {
        notify.error({ message: 'Что-то пошло не так, попробуйте ещё раз отсканировать QR-код.' });
      }
    }
  };

  const onCreate = () =>
    dispatch
      .sync(room.action.create())
      .then(() => onRoute({ activeView: 'game', game: { activePanel: 'room' /* , activeModal: 'teams' */ } }));

  const tabbar = (
    <Tabbar>
      <TabbarItem
        onClick={() => {
          if (showTooltipIndex === 3) {
            return;
          }
          onRoute({ activeModal: 'sets' });
        }}
        indicator={<Badge mode='prominent' />}
        selected
        data-story='sets'
        text='Наборы слов'
      >
        <Tooltip
          isShown={showTooltipIndex === 3}
          onClose={() => onTooltipClose(4)}
          alignY='top'
          alignX='left'
          offsetX={-15}
          mode={'light'}
          text='Тут ты найдёшь все наборы слов, доступные для игры'
        >
          <Icon28WorkOutline />
        </Tooltip>
      </TabbarItem>
      <TabbarItem onClick={onScanQR} selected data-story='qr-code' text='QR-код'>
        <Icon28ScanViewfinderOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => {
          onRoute({ activeModal: 'rules' });
        }}
        selected
        data-story='rules'
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
            isShown={showTooltipIndex === 1}
            onClose={() => onTooltipClose(2)}
            alignX='left'
            alignY='top'
            offsetX={window.innerWidth / 2 - 132}
            cornerOffset={88}
            mode={'light'}
            text='Создай комнату и позови в неё друзей, чтобы начать игру'
          >
            <Button onClick={onCreate} mode='primary' size='l' stretched>
              Создать комнату
            </Button>
          </Tooltip>
          <Spacing size={12} />
          <Tooltip
            isShown={showTooltipIndex === 2}
            onClose={() => onTooltipClose(3)}
            alignX='left'
            alignY='top'
            offsetX={window.innerWidth / 2 - 132}
            offsetY={7}
            cornerOffset={88}
            mode={'light'}
            text='Или присоединись, если кто&#8209;то уже создал :)'
          >
            <Button
              onClick={() => onRoute({ activeModal: 'qr-code' })}
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
