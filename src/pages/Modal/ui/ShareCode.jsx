import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Icon16Done } from '@vkontakte/icons';
import qr from '@vkontakte/vk-qr';
import {
  ANDROID,
  Avatar,
  Button,
  Div,
  IOS,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  PanelHeaderSubmit,
  Snackbar,
  Spacing,
  Text,
  usePlatform,
  VKCOM,
} from '@vkontakte/vkui';

import vkapi from '@/shared/api';
import { CustomUsersStack } from '@/shared/ui';

import styles from './index.module.scss';

const ShareCode = ({ onClose, ...props }) => {
  const platform = usePlatform();
  const roomId = useSelector((state) => state.room.roomId);
  const photos = useSelector((state) => state.room.members.map((member) => member.photo_50));
  const firstNames = useSelector((state) => state.room.members.map((member) => member.first_name));
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const qrCode = useMemo(() => {
    const url = `https://vk.com/app7856384#roomId=${roomId}`;

    const svg = qr.createQR(url, {
      qrSize: 256,
      isShowLogo: true,
      foregroundColor: '#4680c2',
      className: styles.qrCode,
    });

    return { url, svg };
  }, [roomId]);

  const onShareCode = () => {
    vkapi.share(qrCode.url);
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
    <>
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
            QR-код
          </ModalPageHeader>
        }
      >
        <Div>
          <Div className={styles.qrCodeWrapper} dangerouslySetInnerHTML={{ __html: qrCode.svg }} />

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

          <CustomUsersStack photos={photos} firstNames={firstNames} size='m' visibleCount={3} layout='vertical' />

          <Spacing size={24} />
        </Div>

        <div className={styles.info}>
          <Div className={styles.actions}>
            <Button size='l' mode='primary' stretched onClick={onShareCode}>
              Поделиться
            </Button>
            <Button size='l' mode='primary' stretched onClick={onCopyCode}>
              Скопировать
            </Button>
          </Div>
        </div>
      </ModalPage>
      {showCopyMessage && (
        <Snackbar
          duration={2000}
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
    </>
  );
};

export { ShareCode };
