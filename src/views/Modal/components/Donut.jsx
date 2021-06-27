import { useDispatch } from 'react-redux';
import { Icon56DonateOutline } from '@vkontakte/icons';
import { Link, ModalCard } from '@vkontakte/vkui';

import { general } from '@/store';

const Donut = ({ id, ...props }) => {
  const dispatch = useDispatch();

  const onBack = () => dispatch(general.action.route({ activeModal: 'sets' }));

  return (
    <ModalCard
      {...props}
      id={id}
      onClose={onBack}
      icon={<Icon56DonateOutline />}
      header='Этот набор доступен только донам'
      subheader='Поддержи наш проект, стань доном и получи полный доступ ко всем наборам!'
      actions={<Link href='https://vk.com/club204880239'>Давайте</Link>}
    />
  );
};

export { Donut };
