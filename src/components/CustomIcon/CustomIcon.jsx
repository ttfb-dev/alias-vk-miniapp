import {
  Icon24AppleOutline,
  Icon28HorseToyOutline,
  Icon28PlaneOutline,
  Icon28SmartphoneStarsOutline,
  Icon28SunOutline,
  Icon36Hearts2Outline,
} from '@vkontakte/icons';

const CustomIcon = ({ type, ...props }) => {
  switch (type) {
    case 'apple':
      return <Icon24AppleOutline {...props} />;
    case 'plane':
      return <Icon28PlaneOutline {...props} />;
    case 'sun':
      return <Icon28SunOutline {...props} />;
    case 'toy':
      return <Icon28HorseToyOutline {...props} />;
    case 'heart':
      return <Icon36Hearts2Outline {...props} />;
    default:
      return <Icon28SmartphoneStarsOutline {...props} />;
  }
};

export { CustomIcon };