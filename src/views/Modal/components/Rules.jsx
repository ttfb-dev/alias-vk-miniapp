import React from 'react';
import {
  usePlatform,
  ANDROID,
  VKCOM,
  IOS,
  PanelHeaderClose,
  ModalPage,
  ModalPageHeader,
  Div,
  Title,
  Subhead,
  Text,
  Spacing,
} from '@vkontakte/vkui';
import { Icon24Dismiss } from '@vkontakte/icons';

const Rules = ({ onClose, ...props }) => {
  const platform = usePlatform();

  return (
    <ModalPage
      {...props}
      onClose={onClose}
      header={
        <ModalPageHeader
          left={
            (platform === ANDROID || platform === VKCOM) && (
              <PanelHeaderClose onClick={onClose}>Закрыть</PanelHeaderClose>
            )
          }
          right={
            platform === IOS && (
              <PanelHeaderClose onClick={onClose}>
                <Icon24Dismiss />
              </PanelHeaderClose>
            )
          }
        >
          Правила игры
        </ModalPageHeader>
      }
    >
      <Div>
        <Title level='2' weight='semibold'>
          Заголовок
        </Title>
        <Spacing size={12} />
        <Text Component='p' weight='regular' style={{ margin: 0 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In recusandae accusantium similique omnis fugit
          consequuntur quibusdam, saepe ipsum delectus magnam dolorem laboriosam velit tenetur ducimus reiciendis. Cum
          possimus, rem nostrum expedita non ipsa a blanditiis assumenda deleniti culpa quod quas eveniet quaerat velit
          ut optio minus beatae nulla deserunt magni? Ipsum maxime, in mollitia quaerat modi quae harum et quisquam
          corrupti fugiat. Vel, dolorem? Hic velit ratione facere officia accusamus recusandae natus vel minus,
          doloremque harum deleniti odit asperiores doloribus aut aliquam vitae dicta officiis aperiam sunt expedita
          illum dolorum ex? Magni a, sequi vitae pariatur sit earum nam ipsum?
        </Text>
        <Spacing size={12} />
        <Subhead weight='semibold'>Подзаголовок</Subhead>
        <Spacing size={12} />
        <Text Component='p' weight='regular' style={{ margin: 0 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In recusandae accusantium similique omnis fugit
          consequuntur quibusdam, saepe ipsum delectus magnam dolorem laboriosam velit tenetur ducimus reiciendis. Cum
          possimus, rem nostrum expedita non ipsa a blanditiis assumenda deleniti culpa quod quas eveniet quaerat velit
          ut optio minus beatae nulla deserunt magni? Ipsum maxime, in mollitia quaerat modi quae harum et quisquam
          corrupti fugiat. Vel, dolorem? Hic velit ratione facere officia accusamus recusandae natus vel minus,
          doloremque harum deleniti odit asperiores doloribus aut aliquam vitae dicta officiis aperiam sunt expedita
          illum dolorum ex? Magni a, sequi vitae pariatur sit earum nam ipsum?
        </Text>
      </Div>
    </ModalPage>
  );
};

export { Rules };
