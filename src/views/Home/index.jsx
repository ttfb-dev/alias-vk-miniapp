import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Panel, Tabbar, TabbarItem, Badge, Div, Button, Spacing, UsersStack, FixedLayout } from '@vkontakte/vkui';
import { Icon16Add, Icon28WorkOutline, Icon28ScanViewfinderOutline, Icon28InfoOutline } from '@vkontakte/icons';

import vkapi from '../../api';
import app from '../../services';
import { queryStringParse, declension } from '../../helpers';
import { general, room } from '../../store';
import { ReactComponent as Logo } from '../../assets/logo.svg';

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

  useEffect(() => {
    app.getFriendProfiles().then((friends) => {
      dispatch(general.action.setFriends({ friends }));
    });
  }, []); // eslint-disable-line

  const tabbar = (
    <Tabbar>
      <TabbarItem
        onClick={() => dispatch(general.action.route({ activeModal: 'sets' }))}
        indicator={<Badge mode='prominent' />}
        selected
        data-story='sets'
        text='Наборы слов'
      >
        <Icon28WorkOutline />
      </TabbarItem>
      <TabbarItem
        onClick={async () => {
          const code = await vkapi.openCodeReader();
          const url = new URL(code);
          const hashParams = queryStringParse(url.hash);
          const roomId = parseInt(hashParams?.roomId, 10);

          if (roomId) {
            dispatch.sync(room.action.join({ roomId }));
          }
        }}
        selected
        data-story='qr-code'
        text='QR-код'
      >
        <Icon28ScanViewfinderOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => dispatch(general.action.route({ activeModal: 'rules' }))}
        selected
        data-story='rules'
        text='Правила'
      >
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
            {firstNamesShown.reduce((acc, firstName, index) => `${acc}${index === 0 ? '' : ', '}${firstName}`, '')}
            {canShowOthers && `и ещё ${othersFirstNameCount} ${declensionForm}`}
          </UsersStack>
        </div>

        <FixedLayout vertical='bottom' style={{ zIndex: 'auto' }}>
          <Div>
            <Button
              mode='primary'
              size='l'
              stretched
              before={<Icon16Add />}
              onClick={() => dispatch(general.action.route({ activeModal: 'qr-code' }))}
            >
              Присоединиться
            </Button>
            <Spacing size={12} />

            <Button
              mode='primary'
              size='l'
              stretched
              onClick={() =>
                dispatch
                  .sync(room.action.create())
                  .then(() => dispatch(general.action.route({ activePanel: 'room' /* , activeModal: 'teams' */ })))
              }
            >
              Создать комнату
            </Button>
          </Div>
          <Spacing />
        </FixedLayout>
      </div>

      {tabbar}
    </Panel>
  );
};

export { Home };
