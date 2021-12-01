import React from 'react';
import { useRouter } from '@happysanta/router';
import { Icon28PlayCards2Outline } from '@vkontakte/icons';
import { Button, ModalCard } from '@vkontakte/vkui';

import { MODAL_SETS } from '@/app/router';

const EventModalHalloween2021 = (props) => {
  const router = useRouter();

  const onBack = () => router.replaceModal(MODAL_SETS);

  return (
    <ModalCard
      {...props}
      onClose={onBack}
      icon={<Icon28PlayCards2Outline height={56} width={56} />}
      header='Сыграй с друзьями в Alias и расскажи нам, понравилось ли тебе?'
      subheader='Успей до 31 октября и этот набор будет твоим :)'
      actions={
        <Button size='l' mode='primary' target='_blank' href='https://vk.com/topic-204880239_48193061'>
          Оставить отзыв
        </Button>
      }
    />
  );
};

export { EventModalHalloween2021 };
