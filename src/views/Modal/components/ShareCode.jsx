import React, { useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  usePlatform,
  ANDROID,
  VKCOM,
  IOS,
  FixedLayout,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
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

import styles from './ShareCode.module.scss';

const ShareCode = ({ onClose, ...props }) => {
  const platform = usePlatform();
  const roomId = useSelector((state) => state.room.roomId);
  const members = useSelector((state) => state.general.members);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const photos = useMemo(() => {
    return members.map((member) => member.photo_50);
  }, [members]);
  const firstNames = useMemo(() => {
    return members.map((member) => member.first_name);
  }, [members]);

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
    await vkapi.copyText({ text: qrCode.url });
  };

  useEffect(() => {
    const events = (event) => {
      if (!event.detail) {
        return;
      }

      const { type, data } = event.detail;

      if (type === 'VKWebAppCopyTextResult') {
        if (data.result && !showCopyMessage) {
          setShowCopyMessage(true);
        }
      }
    };

    vkapi.bridge.subscribe(events);

    return () => vkapi.bridge.unsubscribe(events);
  }, [showCopyMessage]);

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
          right={
            platform === IOS && (
              <PanelHeaderClose onClick={onClose}>
                <Icon24Dismiss />
              </PanelHeaderClose>
            )
          }
        >
          QR-код для подключения
        </ModalPageHeader>
      }
    >
      <Div>
        <Div className={styles.code} dangerouslySetInnerHTML={{ __html: qrCode.svg }} />

        <Text
          style={{
            textAlign: 'center',
          }}
        >
          Передайте его другим участникам. Либо используйте текстовый код:
          <br />
          <Spacing size={12} />
          <Text weight='semibold'>{roomId}</Text>
        </Text>

        <Spacing size={24} />

        <UsersStack photos={photos} size='m' visibleCount={visibleCount} layout='vertical'>
          {firstNamesShown.reduce((acc, firstName, index) => `${acc}${index === 0 ? '' : ', '}${firstName}`, '')}
          {canShowOthers && `и ещё ${othersFirstNameCount} человека`}
        </UsersStack>
      </Div>
      <Spacing size={24} />

      <FixedLayout vertical='bottom'>
        <Div>
          <div className={styles.actions}>
            <Button size='l' mode='primary' stretched onClick={() => onShareCode()}>
              Поделиться
            </Button>
            <Button size='l' mode='primary' stretched onClick={() => onCopyCode()}>
              Скопировать
            </Button>
          </div>
        </Div>
        <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
          Для начала нужно 4 и более участников. После начала игры присоединиться новым участникам будет нельзя.
        </MiniInfoCell>
      </FixedLayout>

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
          Код скопирован
        </Snackbar>
      )}
    </ModalPage>
  );
};

export { ShareCode };
