import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from '@happysanta/router';
import { Icon16Add, Icon28InfoOutline, Icon28ScanViewfinderOutline, Icon28WorkOutline } from '@vkontakte/icons';
import { Badge, Button, CellButton, Div, Panel, Spacing, Tabbar, TabbarItem, Tooltip } from '@vkontakte/vkui';

import { MODAL_QR_CODE, MODAL_RULES, MODAL_SETS, PAGE_ROOM } from '@/app/router';
import { ReactComponent as Logo } from '@/assets/logo.svg';
import vkapi from '@/shared/api';
import { misc } from '@/shared/config';
import App from '@/shared/services';
import { CustomUsersStack, Notification } from '@/shared/ui';
import { game, room } from '@/store';

import styles from './index.module.scss';

const Home = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomId = useSelector((state) => state.room.roomId);
  const hasHashRoomId = misc.roomId !== null;
  const photos = useSelector((state) => state.general.friends.map((friend) => friend.photo_50));
  const firstNames = useSelector((state) => state.general.friends.map((friend) => friend.first_name));

  const [tooltipIndex, setTooltipIndex] = useState(false);

  useEffect(() => {
    (async () => {
      const tooltipIndex = await App.getTooltipIndex('homeTooltipIndex');
      setTooltipIndex(tooltipIndex);
    })();
  }, []);

  const onTooltipClose = async (index) => {
    await App.setTooltipIndex('homeTooltipIndex', index);

    setTooltipIndex(index);
  };

  const onScanQR = async () => {
    try {
      const { code_data } = await vkapi.openCodeReader();
      const url = new URL(code_data);
      const hashParams = new URLSearchParams(url.hash.substring(1));
      const roomId = hashParams.get('roomId');

      if (roomId) {
        dispatch.sync(room.action.join({ roomId, method: 'qr.home' })).then(() => router.pushPage(PAGE_ROOM));
      }
    } catch ({ error_data }) {
      if (error_data?.error_reason === 'Unsupported platform') {
        toast.error(<Notification message='???????? ???????????????????? ???? ???????????????????????? ???????????????????????? QR-??????????.' type='error' />);
      }
    }
  };

  const onJoinRoom = () => router.pushPage(PAGE_ROOM);
  const onLeaveRoom = () =>
    dispatch
      .sync(game.action.finish({ reason: 'reconnect_cancel' }))
      .then(() => dispatch.sync(room.action.leave()).then(() => dispatch(room.action.setRoomId({ roomId: null }))));
  const onCreateRoom = () => dispatch.sync(room.action.create()).then(() => router.pushPage(PAGE_ROOM));

  const tabbar = (
    <Tabbar>
      <TabbarItem
        className={styles.cursorPointer}
        onClick={() => {
          if (tooltipIndex === 3) {
            return;
          }

          router.pushModal(MODAL_SETS, { from: 'profile' });
        }}
        indicator={<Badge mode='prominent' />}
        selected
        text='???????????? ????????'
      >
        <Tooltip
          isShown={tooltipIndex === 3}
          onClose={() => onTooltipClose(4)}
          alignY='top'
          alignX='left'
          offsetX={-15}
          mode='light'
          text='?????? ???? ?????????????? ?????? ???????????? ????????, ?????????????????? ?????? ????????.'
        >
          <Icon28WorkOutline />
        </Tooltip>
      </TabbarItem>
      <TabbarItem onClick={onScanQR} selected text='QR-??????' className={styles.cursorPointer}>
        <Icon28ScanViewfinderOutline />
      </TabbarItem>
      <TabbarItem
        className={styles.cursorPointer}
        onClick={() => {
          router.pushModal(MODAL_RULES);
        }}
        selected
        text='??????????????'
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
        {roomId ? (
          <Div>
            <Button onClick={onJoinRoom} mode='primary' size='l' stretched>
              {hasHashRoomId ? '???????????????????????? ?? ??????????????' : '?????????????????? ?? ??????????????'}
            </Button>
            <Spacing size={12} />
            <CellButton mode='danger' centered onClick={onLeaveRoom}>
              {hasHashRoomId ? '????????????' : '?????????? ???? ??????????????'}
            </CellButton>
          </Div>
        ) : (
          <Div>
            <Tooltip
              isShown={tooltipIndex === 1}
              onClose={() => onTooltipClose(2)}
              alignX='left'
              alignY='top'
              offsetX={window.innerWidth / 2 - 132}
              cornerOffset={88}
              mode='light'
              text='???????????? ?????????????? ?? ???????????? ?? ?????? ????????????, ?????????? ???????????? ????????.'
            >
              <Button onClick={onCreateRoom} mode='primary' size='l' stretched>
                ?????????????? ??????????????
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
              text='?????? ????????????????????????, ???????? ??????-???? ?????? ????????????. :)'
            >
              <Button
                onClick={() => router.pushModal(MODAL_QR_CODE)}
                mode='secondary'
                size='l'
                stretched
                before={<Icon16Add />}
              >
                ????????????????????????????
              </Button>
            </Tooltip>
          </Div>
        )}
      </div>

      {tabbar}
    </Panel>
  );
};

export { Home };
