import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Panel, Tabbar, TabbarItem, Badge, Div, Button, Spacing, UsersStack } from '@vkontakte/vkui';
import { Icon16Add, Icon28WorkOutline, Icon28ScanViewfinderOutline, Icon28InfoOutline } from '@vkontakte/icons';

import vkapi from '../../../api';
import app from '../../../services';
import { queryStringParse, declension } from '../../../helpers';
import { general, room } from '../../../store';
import { ReactComponent as Logo } from '../../../assets/logo.svg';

import styles from './index.module.scss';

const Home = (props) => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.general.friends.map((friend) => friend.photo_50));
  const firstNames = useSelector((state) => state.general.friends.map((friend) => friend.first_name));

  const visibleCount = 4;
  const othersFirstNameCount = Math.max(0, firstNames.length - visibleCount);
  const canShowOthers = othersFirstNameCount > 0;
  const firstNamesShown = firstNames.slice(0, visibleCount);

  const declensionForm = useMemo(() => {
    return declension(othersFirstNameCount, ['человек', 'человека', 'человек']);
  }, [othersFirstNameCount]);

  const getFirstNames = useMemo(() => {
    return firstNamesShown.reduce((acc, firstName, index) => `${acc}${index === 0 ? '' : ', '}${firstName}`, '');
  }, [firstNamesShown]);

  useEffect(() => {
    app.getFriendProfiles().then((friends) => {
      dispatch(general.action.setFriends({ friends }));
    });
  }, []); // eslint-disable-line

  const onRoute = (route) => dispatch(general.action.route(route));

  const onScanQR = async () => {
    const code = await vkapi.openCodeReader();
    const url = new URL(code);
    const hashParams = queryStringParse(url.hash);
    const roomId = parseInt(hashParams?.roomId, 10);

    if (roomId) {
      dispatch.sync(room.action.join({ roomId }));
    }
  };

  const onCreate = () =>
    dispatch
      .sync(room.action.create())
      .then(() => onRoute({ main: { activePanel: 'room' /* , activeModal: 'teams' */ } }));

  const tabbar = (
    <Tabbar>
      <TabbarItem
        onClick={() => onRoute({ activeModal: 'sets' })}
        indicator={<Badge mode='prominent' />}
        selected
        data-story='sets'
        text='Наборы слов'
      >
        <Icon28WorkOutline />
      </TabbarItem>
      <TabbarItem onClick={onScanQR} selected data-story='qr-code' text='QR-код'>
        <Icon28ScanViewfinderOutline />
      </TabbarItem>
      <TabbarItem onClick={() => onRoute({ activeModal: 'rules' })} selected data-story='rules' text='Правила'>
        <Icon28InfoOutline />
      </TabbarItem>
    </Tabbar>
  );

  return (
    <Panel {...props}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.background} />
          <Logo />

          <Spacing size={64} />

          <UsersStack photos={photos} size='m' visibleCount={visibleCount} layout='vertical'>
            {getFirstNames}
            {canShowOthers && ` и ещё ${othersFirstNameCount} ${declensionForm}`}
          </UsersStack>
        </div>
      </div>

      <div className={styles.fixedLayout}>
        <Div>
          <Button
            onClick={() => onRoute({ activeModal: 'qr-code' })}
            mode='primary'
            size='l'
            stretched
            before={<Icon16Add />}
          >
            Присоединиться
          </Button>
          <Spacing size={12} />

          <Button onClick={onCreate} mode='primary' size='l' stretched>
            Создать комнату
          </Button>
        </Div>
      </div>

      {tabbar}
    </Panel>
  );
};

export { Home };
