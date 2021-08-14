import React from 'react';
import { useRouter } from '@happysanta/router';
import { Icon56UserAddOutline } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import { Button, ModalCard } from '@vkontakte/vkui';

import { MODAL_SETS } from '@/app/router';

const JoinGroup = (props) => {
  const router = useRouter();

  const onBack = () => router.replaceModal(MODAL_SETS);

  const onJoin = () => {
    bridge.send('VKWebAppJoinGroup', { group_id: 204880239 }).then(onBack).catch(onBack);
  };

  return (
    <ModalCard
      {...props}
      onClose={onBack}
      icon={<Icon56UserAddOutline />}
      header='Вступи в нашу группу, чтобы разблокировать этот набор'
      subheader='Там ты сможешь выбирать, какой следующий набор мы выпустим :)'
      actions={
        <Button size='l' mode='primary' onClick={onJoin}>
          Давайте
        </Button>
      }
    />
  );
};

export { JoinGroup };
