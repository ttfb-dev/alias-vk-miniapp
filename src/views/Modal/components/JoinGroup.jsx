import { useDispatch } from 'react-redux';
import { Icon56UserAddOutline } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import { Button, ModalCard } from '@vkontakte/vkui';

import { general } from '@/store';

const JoinGroup = ({ id, ...props }) => {
  const dispatch = useDispatch();

  const onBack = () => dispatch(general.action.route({ activeModal: 'sets' }));

  const onJoin = () => {
    bridge.send('VKWebAppJoinGroup', { group_id: 204880239 }).then(onBack).catch(onBack);
  };

  return (
    <ModalCard
      {...props}
      id={id}
      onClose={onBack}
      icon={<Icon56UserAddOutline />}
      header='Вступи в нашу группу, чтобы разблокировать этот набор'
      subheader='Там публикуются новости, проводятся опросы, '
      actions={
        <Button size='l' mode='primary' onClick={onJoin}>
          Давайте
        </Button>
      }
    />
  );
};

export { JoinGroup };
