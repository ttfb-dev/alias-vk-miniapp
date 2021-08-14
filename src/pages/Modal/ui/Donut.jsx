import React from 'react';
import { useRouter } from '@happysanta/router';
import { Icon56DonateOutline } from '@vkontakte/icons';
import { Button, IOS, ModalCard, usePlatform } from '@vkontakte/vkui';

import { MODAL_SETS } from '@/app/router';

const Donut = (props) => {
  const router = useRouter();

  const platform = usePlatform();

  const isIOS = platform === IOS;

  const onBack = () => router.replaceModal(MODAL_SETS);

  const header = !isIOS ? 'Этот набор доступен донам нашего сообщества' : 'Этот набор доступен c подпиской';

  const subheader = !isIOS ? 'Поддержи наш проект, стань доном и получи полный доступ ко всем наборам!' : null;

  return (
    <ModalCard
      {...props}
      onClose={onBack}
      icon={<Icon56DonateOutline />}
      header={header}
      subheader={subheader}
      actions={
        !isIOS ? (
          <Button size='l' mode='primary' target='_blank' href='https://vk.com/club204880239'>
            Подробнее
          </Button>
        ) : (
          <Button size='l' mode='primary' onClick={onBack}>
            Хорошо
          </Button>
        )
      }
    />
  );
};

export { Donut };
