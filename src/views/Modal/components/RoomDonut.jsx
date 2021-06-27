import { useDispatch } from 'react-redux';
import { Icon56DonateOutline } from '@vkontakte/icons';
import { Link, ModalCard } from '@vkontakte/vkui';

import { general } from '@/store';

const RoomDonut = (props) => {
  const dispatch = useDispatch();

  const onBack = () => dispatch(general.action.route({ activeModal: 'room-sets' }));

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

export { RoomDonut };
