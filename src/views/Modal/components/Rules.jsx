import React from 'react';
import { Icon24Dismiss } from '@vkontakte/icons';
import {
  ANDROID,
  Button,
  Div,
  IOS,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  Text,
  Title,
  usePlatform,
  VKCOM,
} from '@vkontakte/vkui';

import styles from './index.module.scss';

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
          Правила
        </ModalPageHeader>
      }
    >
      <Div>
        <Title level='2' weight='semibold'>
          Об игре
        </Title>
        <Text Component='p' weight='regular'>
          Для участия в&nbsp;игре Alias вам понадобится только смартфон!
        </Text>
        <Text Component='p' weight='regular'>
          Участники разбиваются на&nbsp;команды. В&nbsp;команде могут быть от&nbsp;двух и&nbsp;более человек.
        </Text>
        <Text Component='p' weight='regular'>
          Основная задача участника объяснить как можно больше слов за&nbsp;отведенное время своим сокомандникам.
        </Text>
        <Text Component='p' weight='regular'>
          Одно угаданное слово&nbsp;— плюс одно очко. За&nbsp;каждое неотгаданное или пропущенное слово команда
          штрафуется и&nbsp;одно очко отнимается.
        </Text>
        <Text Component='p' weight='regular'>
          Выигрывает команда, которая набрала достаточное количество очков по&nbsp;завершении раунда.
        </Text>
        <Title level='2' weight='semibold'>
          Как объяснять слова
        </Title>

        <ul className={styles.list}>
          <li>
            Нельзя произносить загаданное слово, использовать его однокоренные слова, называть на&nbsp; иностранном
            языке и указывать на&nbsp; конкретный предмет. Например, загадано слово <q>стул</q>, то&nbsp;указывать
            на&nbsp;стул нельзя
          </li>
          <li>
            Можно использовать синонимы и&nbsp; антонимы,объяснять слова с&nbsp;помощью ваших ассоциаций к&nbsp; этому
            слову и&nbsp; использовать любые другие способы, главное, чтобы вас понимали ваши сокомандники!
          </li>
        </ul>

        <Title level='2' weight='semibold'>
          Подготовка
        </Title>
        <Text Component='p' weight='regular'>
          Один участник создает комнату для игры, а&nbsp;остальные участники присоединяются к&nbsp;ней. Есть три способа
          подключения к&nbsp;комнате:
        </Text>

        <ul className={styles.list}>
          <li>
            Отсканировать QR-код, который отображается на&nbsp;телефоне участника-создателя игры, а&nbsp;также
            у&nbsp;всех, кто уже присоединился к&nbsp;комнате;
          </li>
          <li>Перейти по&nbsp;ссылке, которую участник-создатель может отправить;</li>
          <li>Ввести номер комнаты, который также отображается на&nbsp;телефоне у&nbsp;участника-создателя;</li>
        </ul>

        <Text Component='p' weight='regular'>
          После того, как участник подключился к&nbsp;комнате, он&nbsp;выбирает в&nbsp;какой команде он&nbsp;будет
          играть.
        </Text>
        <Text Component='p' weight='regular'>
          Только участник-создатель может менять настройки комнаты.
        </Text>
        <Title level='2' weight='semibold'>
          Ход игры
        </Title>
        <Text Component='p' weight='regular'>
          Когда все участники разбились на&nbsp;команды, участник-создатель начинает игру и все переходят на&nbsp; экран
          игрового поля.
        </Text>
        <Text Component='p' weight='regular'>
          Система сама выбирает какая команда начнет и&nbsp;кто из&nbsp;сокомандников будет объяснять, а&nbsp;кто
          угадывать.
        </Text>
        <Text Component='p' weight='regular'>
          Все участники противоположных команд могут видеть на&nbsp;экранах своих смартфонов список отыгравших
          в&nbsp;этом шаге слов.
        </Text>
        <Text Component='p' weight='regular'>
          Если слово угадано, то&nbsp;тот кто объясняет, нажимает кнопку <q>угадал</q>, если не&nbsp;угадано,
          то&nbsp;кнопку <q>пропустить</q>. Так происходит до&nbsp;тех пор, пока не&nbsp;закончится время.
        </Text>
        <Text Component='p' weight='regular'>
          В&nbsp;конце хода по&nbsp;истечении времени у&nbsp;объяснявшего игрока высвечивается список отыгранных слов,
          который он&nbsp;может редактировать. Каждому слову можно менять состояние <q>угадано-не угадано</q>.
        </Text>
        <Text Component='p' weight='regular'>
          После редактирования отгаданных слов команде начисляются очки. Так повторяется, пока каждая команда
          не&nbsp;отыграет свои слова равное количество раз.
        </Text>
        <Text Component='p' weight='regular'>
          Если в&nbsp;результате раунда командам не&nbsp;хватает очков, то&nbsp;наступает новый раунд. Так до&nbsp;тех
          пор, пока не&nbsp;будет выявлен победитель.
        </Text>
        <Div className={styles.bottomSticky}>
          <Button size='l' mode='primary' stretched onClick={onClose}>
            Всё понятно!
          </Button>
        </Div>
      </Div>
    </ModalPage>
  );
};

export { Rules };
