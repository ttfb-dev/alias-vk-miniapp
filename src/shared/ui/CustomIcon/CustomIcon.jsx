import {
  Icon16WindRain,
  Icon24AppleOutline,
  Icon28CrownOutline,
  Icon28HorseToyOutline,
  Icon28PlaneOutline,
  Icon28SmartphoneStarsOutline,
  Icon28SnowflakeOutline,
  Icon28SunOutline,
  Icon36Hearts2Outline,
  Icon56FavoriteOutline,
  Icon56GhostOutline,
  Icon56MentionOutline,
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
    case 'star':
      return <Icon56FavoriteOutline {...props} />;
    case 'wind':
      return <Icon16WindRain {...props} />;
    case 'ghost':
      return <Icon56GhostOutline {...props} />;
    case 'snow':
      return <Icon28SnowflakeOutline {...props} />;
    case 'at':
      return <Icon56MentionOutline {...props} />;
    case 'crown':
      return <Icon28CrownOutline {...props} />;
    default:
      return <Icon28SmartphoneStarsOutline {...props} />;
  }
};

export { CustomIcon };
