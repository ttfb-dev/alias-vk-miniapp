import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  usePlatform,
  ANDROID,
  VKCOM,
  IOS,
  PanelHeaderClose,
  ModalPage,
  ModalPageHeader,
  Div,
  Text,
  MiniInfoCell,
  Spacing,
  UsersStack,
  Button,
  Snackbar,
  Avatar,
} from '@vkontakte/vkui';
import { Icon16InfoCirle, Icon16Done, Icon24Dismiss } from '@vkontakte/icons';
import qr from '@vkontakte/vk-qr';

import vkapi from '../../../api';
import { general } from '../../../store';

import styles from './ShareCode.module.scss';

const ShareCode = () => {
  const platform = usePlatform();
  const dispatch = useDispatch();
  const roomId = useSelector((state) => state.room.roomId);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const photos = useSelector((state) => state.general.friends.map((friend) => friend.photo_50));
  const firstNames = useSelector((state) => state.general.friends.map((friend) => friend.first_name));

  const visibleCount = 4;
  const othersFirstNameCount = Math.max(0, firstNames.length - visibleCount);
  const canShowOthers = othersFirstNameCount > 0;
  const firstNamesShown = firstNames.slice(0, visibleCount);

  const qrCode = useMemo(() => {
    const url = `https://vk.com/app7856384#roomId=${roomId}`;

    const svg = qr.createQR(url, {
      qrSize: 256,
      isShowLogo: true,
      foregroundColor: '#4680c2',
    });

    return { url, svg };
  }, [roomId]);

  const onShareCode = () => {
    vkapi.share({ link: qrCode.url });
  };

  const onCopyCode = async () => {
    const done = await vkapi.copyText({ text: qrCode.url });

    if (done && !showCopyMessage) {
      setShowCopyMessage(true);
    }
  };

  return (
    <ModalPage
      id='share-code'
      onClose={() => dispatch(general.action.route({ activeModal: null }))}
      header={
        <ModalPageHeader
          left={
            (platform === ANDROID || platform === VKCOM) && (
              <PanelHeaderClose onClick={() => dispatch(general.action.route({ activeModal: null }))}>
                Закрыть
              </PanelHeaderClose>
            )
          }
          right={
            platform === IOS && (
              <PanelHeaderClose onClick={() => dispatch(general.action.route({ activeModal: null }))}>
                <Icon24Dismiss />
              </PanelHeaderClose>
            )
          }
        >
          QR-код для подключения
        </ModalPageHeader>
      }
      dynamicContentHeight
    >
      <Div className={styles.share}>
        <Div className={styles.code} dangerouslySetInnerHTML={{ __html: qrCode.svg }} />

        <Text
          style={{
            textAlign: 'center',
          }}
        >
          Передайте его другим участникам. Либо используйте текстовый код:
          <br />
          {roomId}
        </Text>

        <Spacing size={24} style={{ width: '100%' }} />

        <UsersStack photos={photos} size='m' visibleCount={visibleCount} layout='vertical'>
          {firstNamesShown.reduce((acc, firstName, index) => `${acc}${index === 0 ? '' : ', '}${firstName}`, '')}
          {canShowOthers && `и ещё ${othersFirstNameCount} человека`}
        </UsersStack>

        <Spacing size={24} style={{ width: '100%' }} />

        <div style={{ display: 'flex', gap: '12px', width: '100%', flexDirection: 'row' }}>
          <Button size='l' mode='primary' stretched onClick={() => onShareCode()}>
            Поделиться
          </Button>
          <Button size='l' mode='primary' stretched onClick={() => onCopyCode()}>
            Скопировать
          </Button>
        </div>
        <Spacing size={24} style={{ width: '100%' }} />
        <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
          Для начала нужно 4 и более участников. После начала игры присоединиться новым участникам будет нельзя.
        </MiniInfoCell>
      </Div>
      {showCopyMessage && (
        <Snackbar
          duration={3000}
          onClose={() => setShowCopyMessage(false)}
          before={
            <Avatar size={24} style={{ background: 'var(--accent)' }}>
              <Icon16Done fill='#fff' width={14} height={14} />
            </Avatar>
          }
        >
          Ссылка скопирована
        </Snackbar>
      )}
    </ModalPage>
  );
};

export { ShareCode };
