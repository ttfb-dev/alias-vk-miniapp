import React from 'react';
import { useRouter } from '@happysanta/router';
import { Icon56DonateOutline } from '@vkontakte/icons';
import { Link, ModalCard } from '@vkontakte/vkui';

import { MODAL_SETS } from '@/router';

const Donut = (props) => {
  const router = useRouter();

  const onBack = () => router.replaceModal(MODAL_SETS);

  return (
    <ModalCard
      {...props}
      onClose={onBack}
      icon={<Icon56DonateOutline />}
      header='Этот набор доступен только донам нашего сообщества'
      subheader='Поддержи наш проект, стань доном и получи полный доступ ко всем наборам!'
      actions={
        <Link style={{ margin: '0 auto' }} href='https://vk.com/club204880239'>
          Подробнее
        </Link>
      }
    />
  );
};

export { Donut };
