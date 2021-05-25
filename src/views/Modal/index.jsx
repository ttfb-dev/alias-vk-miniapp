import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  usePlatform,
  ANDROID,
  VKCOM,
  IOS,
  PanelHeaderClose,
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  ModalCard,
  Button,
  Div,
  FormLayout,
  FormItem,
  Input,
  List,
  SimpleCell,
  Switch,
  MiniInfoCell,
  Header,
  Title,
  Subhead,
  Text,
  Spacing,
  Slider,
  UsersStack,
  Snackbar,
  Avatar,
} from '@vkontakte/vkui';
import { Icon16Done, Icon16InfoCirle, Icon24Dismiss } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import qr from '@vkontakte/vk-qr';

import { general } from '../../store';

import styles from './index.module.scss';

const Modal = () => {
  const platform = usePlatform();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const qrCode = useMemo(() => {
    // const url = JSON.stringify({ roomId: state.room.roomId });
    const url = `http://vk.com/app7856384#join-room=${state.room.roomId}`;

    const svg = qr.createQR(url, {
      qrSize: 256,
      isShowLogo: true,
      foregroundColor: '#4680c2',
    });

    return { url, svg };
  }, [state.room.roomId]);

  const onShareCode = () => {
    bridge.send('VKWebAppShare', { link: qrCode.url });
  };

  const onCopyCode = async () => {
    bridge.send('VKWebAppCopyText', { text: qrCode.url }).then((result) => {
      if (result && !showCopyMessage) {
        setShowCopyMessage(true);
      }
    });
  };

  return (
    <ModalRoot
      activeModal={state.general.activeModal}
      onClose={() => dispatch(general.action.route({ activeModal: null }))}
    >
      <ModalCard
        id='qr-code'
        onClose={() => dispatch(general.action.route({ activeModal: null }))}
        header='Отсканируйте QR-код'
        subheader='или введите код комнаты'
      >
        <Div style={{ display: 'flex', gap: '12px' }}>
          <Button
            size='l'
            mode='primary'
            stretched
            onClick={() => {
              bridge.send('VKWebAppOpenCodeReader').then((result) => {
                // eslint-disable-next-line
                console.log(result);
              });
            }}
          >
            Сканировать
          </Button>
          <Button
            size='l'
            mode='primary'
            stretched
            onClick={() => dispatch(general.action.route({ activeModal: 'enter-code' }))}
          >
            Ввести
          </Button>
        </Div>
        <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
          Код вы можете получить у создателя комнаты
        </MiniInfoCell>
      </ModalCard>

      <ModalCard
        id='enter-code'
        onClose={() => dispatch(general.action.route({ activeModal: null }))}
        header='Введите код'
      >
        <FormLayout>
          <FormItem>
            <Input type='text' align='center' />
          </FormItem>
          <FormItem>
            <Button type='submit' size='l' mode='primary' stretched>
              Присоединиться
            </Button>
          </FormItem>
        </FormLayout>
        <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
          Код вы можете получить у создателя комнаты
        </MiniInfoCell>
      </ModalCard>

      <ModalPage
        id='share-code'
        onClose={() => dispatch(general.action.route({ activeModal: null }))}
        header={
          <ModalPageHeader
            left={
              (platform === ANDROID || platform === VKCOM) && (
                <PanelHeaderClose onClick={() => dispatch(general.action.route({ activeModal: null }))}>
                  Закрыть
                </PanelHeaderClose>
              )
            }
            right={
              platform === IOS && (
                <PanelHeaderClose onClick={() => dispatch(general.action.route({ activeModal: null }))}>
                  <Icon24Dismiss />
                </PanelHeaderClose>
              )
            }
          >
            QR-код для подключения
          </ModalPageHeader>
        }
        dynamicContentHeight
      >
        <Div className={styles.share}>
          <Div className={styles.code} dangerouslySetInnerHTML={{ __html: qrCode.svg }} />

          <Text
            style={{
              textAlign: 'center',
            }}
          >
            Передайте его другим участникам. Либо используйте текстовый код:
            <br />
            {state.room.roomId}
          </Text>

          <Spacing size={24} style={{ width: '100%' }} />

          <UsersStack size='m' count={3} layout='vertical'>
            Алексей, Илья, Михаил
            <br />и ещё 3 человека
          </UsersStack>

          <Spacing size={24} style={{ width: '100%' }} />

          <div style={{ display: 'flex', gap: '12px', width: '100%', flexDirection: 'row' }}>
            <Button size='l' mode='primary' stretched onClick={() => onShareCode()}>
              Поделиться
            </Button>
            <Button size='l' mode='primary' stretched onClick={() => onCopyCode()}>
              Скопировать
            </Button>
          </div>
          <Spacing size={24} style={{ width: '100%' }} />
          <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
            Для начала нужно 4 и более участников. После начала игры присоединиться новым участникам будет нельзя.
          </MiniInfoCell>
        </Div>
        {showCopyMessage && (
          <Snackbar
            duration={3000}
            onClose={() => setShowCopyMessage(false)}
            before={
              <Avatar size={24} style={{ background: 'var(--accent)' }}>
                <Icon16Done fill='#fff' width={14} height={14} />
              </Avatar>
            }
          >
            Ссылка скопирована
          </Snackbar>
        )}
      </ModalPage>

      <ModalPage
        id='create-room'
        onClose={() => dispatch(general.action.route({ activeModal: null }))}
        header={
          <ModalPageHeader
            left={
              (platform === ANDROID || platform === VKCOM) && (
                <PanelHeaderClose onClick={() => dispatch(general.action.route({ activeModal: null }))}>
                  Закрыть
                </PanelHeaderClose>
              )
            }
            right={
              platform === IOS && (
                <PanelHeaderClose onClick={() => dispatch(general.action.route({ activeModal: null }))}>
                  <Icon24Dismiss />
                </PanelHeaderClose>
              )
            }
          >
            Создать комнату
          </ModalPageHeader>
        }
        dynamicContentHeight
      >
        <Div>
          <FormLayout>
            <Header mode='secondary'>Настройки</Header>
            <List>
              <SimpleCell disabled after={<Switch defaultChecked />}>
                Использовать свои словари
              </SimpleCell>
              <SimpleCell disabled after={<Switch />}>
                Разрешить подсказки
              </SimpleCell>
            </List>
            <FormItem top='Время раунда'>
              <Slider defaultValue={60} min={20} max={90} step={1} />
            </FormItem>

            <FormItem>
              <Button size='l' stretched>
                Создать
              </Button>
            </FormItem>
          </FormLayout>
          <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
            После создания комнаты вы сможете предоставить код остальным участникам
          </MiniInfoCell>
        </Div>
      </ModalPage>

      <ModalPage
        id='teams'
        onClose={() => dispatch(general.action.route({ activeModal: null }))}
        header={
          <ModalPageHeader
            left={
              (platform === ANDROID || platform === VKCOM) && (
                <PanelHeaderClose onClick={() => dispatch(general.action.route({ activeModal: null }))}>
                  Закрыть
                </PanelHeaderClose>
              )
            }
            right={
              platform === IOS && (
                <PanelHeaderClose onClick={() => dispatch(general.action.route({ activeModal: null }))}>
                  <Icon24Dismiss />
                </PanelHeaderClose>
              )
            }
          >
            Выбор команды
          </ModalPageHeader>
        }
        settlingHeight={100}
      >
        <Div>
          <List style={{ flex: 1 }}>123</List>
          <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
            Для начала нужно 4 и более участников. После начала игры присоединиться новым участникам будет нельзя.
          </MiniInfoCell>
        </Div>
      </ModalPage>

      <ModalPage
        id='rules'
        onClose={() => dispatch(general.action.route({ activeModal: null }))}
        header={
          <ModalPageHeader
            left={
              (platform === ANDROID || platform === VKCOM) && (
                <PanelHeaderClose onClick={() => dispatch(general.action.route({ activeModal: null }))}>
                  Закрыть
                </PanelHeaderClose>
              )
            }
            right={
              platform === IOS && (
                <PanelHeaderClose onClick={() => dispatch(general.action.route({ activeModal: null }))}>
                  <Icon24Dismiss />
                </PanelHeaderClose>
              )
            }
          >
            Правила игры
          </ModalPageHeader>
        }
        dynamicContentHeight
      >
        <Div>
          <Title level='2' weight='semibold'>
            Заголовок
          </Title>
          <Spacing size={12} />
          <Text Component='p' weight='regular' style={{ margin: 0 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In recusandae accusantium similique omnis fugit
            consequuntur quibusdam, saepe ipsum delectus magnam dolorem laboriosam velit tenetur ducimus reiciendis. Cum
            possimus, rem nostrum expedita non ipsa a blanditiis assumenda deleniti culpa quod quas eveniet quaerat
            velit ut optio minus beatae nulla deserunt magni? Ipsum maxime, in mollitia quaerat modi quae harum et
            quisquam corrupti fugiat. Vel, dolorem? Hic velit ratione facere officia accusamus recusandae natus vel
            minus, doloremque harum deleniti odit asperiores doloribus aut aliquam vitae dicta officiis aperiam sunt
            expedita illum dolorum ex? Magni a, sequi vitae pariatur sit earum nam ipsum?
          </Text>
          <Spacing size={12} />
          <Subhead weight='semibold'>Подзаголовок</Subhead>
          <Spacing size={12} />
          <Text Component='p' weight='regular' style={{ margin: 0 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In recusandae accusantium similique omnis fugit
            consequuntur quibusdam, saepe ipsum delectus magnam dolorem laboriosam velit tenetur ducimus reiciendis. Cum
            possimus, rem nostrum expedita non ipsa a blanditiis assumenda deleniti culpa quod quas eveniet quaerat
            velit ut optio minus beatae nulla deserunt magni? Ipsum maxime, in mollitia quaerat modi quae harum et
            quisquam corrupti fugiat. Vel, dolorem? Hic velit ratione facere officia accusamus recusandae natus vel
            minus, doloremque harum deleniti odit asperiores doloribus aut aliquam vitae dicta officiis aperiam sunt
            expedita illum dolorum ex? Magni a, sequi vitae pariatur sit earum nam ipsum?
          </Text>
        </Div>
      </ModalPage>
    </ModalRoot>
  );
};

export { Modal };
