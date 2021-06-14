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
  Text,
  Button,
} from '@vkontakte/vkui';
import { Icon24Dismiss } from '@vkontakte/icons';

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
          Правила игры
        </ModalPageHeader>
      }
    >
      <Div>
        <Title level='2' weight='semibold'>
          Об игре
        </Title>
        <Text Component='p' weight='regular'>
          Если вы&nbsp;являетесь пользователем ВКонтакте, то&nbsp;для участия в&nbsp;игре Alias ВКонтакте вам
          понадобится только смартфон!
        </Text>
        <Text Component='p' weight='regular'>
          Участники разбиваются на&nbsp;команды. В&nbsp;команде могут быть от&nbsp;двух и&nbsp;более человек
        </Text>
        <Text Component='p' weight='regular'>
          Основная задача каждого участника объяснить как можно больше слов за&nbsp;отведенное время своим
          сокомандникам. Одно угаданное слово&nbsp;— плюс одно очко. За&nbsp;каждое не&nbsp;отгаданное или пропущенное
          слово команда штрафуется и&nbsp;одно очко отнимается
        </Text>
        <Text Component='p' weight='regular'>
          Выигрывает та&nbsp;команда, которая набрала достаточное количество очков по&nbsp;завершении раунда
        </Text>
        <Title level='2' weight='semibold'>
          Как объяснять слова
        </Title>

        <ul className={styles.list}>
          <li>Нельзя произносить загаданное слово или использовать его однокоренные слова</li>
          <li>
            Нельзя указывать на&nbsp;конкретный предмет. Например, загадано слово <q>стул</q>, то&nbsp;указывать
            на&nbsp;стул нельзя
          </li>
          <li>Нельзя называть загаданные слова на&nbsp;иностранном языке</li>
          <li>Вы&nbsp;можете использовать синонимы или антонимы</li>
          <li>Вы&nbsp;можете использовать синонимы или антонимы</li>
          <li>Вы&nbsp;можете использовать синонимы или антонимы</li>
          <li>Можно объяснять слова с&nbsp;помощью ваших ассоциаций к&nbsp;этому слову</li>
          <li>Можете использовать любые другие способы, главное, чтобы вас понимали ваши сокомандники!</li>
        </ul>

        <Title level='2' weight='semibold'>
          Ход игры
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
          После того, как участник подключился к&nbsp;комнате, он&nbsp;выбирает в&nbsp;какой команде он&nbsp;будут
          играть. Команды можно добавлять или удалять, а&nbsp;также переименовывать
        </Text>
        <Text Component='p' weight='regular'>
          Только участник-создатель может менять настройки комнаты
        </Text>
        <Text Component='p' weight='regular'>
          Когда все участники разбились на&nbsp;команды, участник-создатель может начать игру
        </Text>
        <Text Component='p' weight='regular'>
          Все участники переходят на&nbsp;экран игрового поля
        </Text>
        <Text Component='p' weight='regular'>
          Система сама выбирает какая команда начнет и&nbsp;кто из&nbsp;сокомандников будет объяснять, а&nbsp;кто
          угадывать
        </Text>
        <Text Component='p' weight='regular'>
          Все участники противоположных команд могут видеть на&nbsp;экранах своих смартфонов список отыгравших
          в&nbsp;этом шаге слов
        </Text>
        <Text Component='p' weight='regular'>
          Если слово угадано, то&nbsp;тот сокомандник, который объясняет, нажимает кнопку <q>угадал</q>, если
          не&nbsp;угадано, то&nbsp;кнопку <q>пропустить</q>. Так происходит до&nbsp;тех пор, пока не&nbsp;закончится
          время
        </Text>
        <Text Component='p' weight='regular'>
          В&nbsp;конце хода по&nbsp;истечении времени у&nbsp;объяснявшего слова игрока высвечивается список слов,
          который он&nbsp;может редактировать в&nbsp;случае если была обнаружена ошибка в&nbsp;угадывании слов. Каждому
          слову можно менять состояние <q>угадано-не угадано</q>
        </Text>
        <Text Component='p' weight='regular'>
          После редактирования отгаданных слов команде начисляются очки. Так повторяется, пока каждая команда
          не&nbsp;отыграет свои слова равное количество раз.
        </Text>
        <Title level='2' weight='semibold'>
          Как определяется победитель
        </Title>
        <Text Component='p' weight='regular'>
          По&nbsp;окончании раунда выигрывает та&nbsp;команда, которая набрала необходимое количество очков.
        </Text>
        <Text Component='p' weight='regular'>
          Если в&nbsp;результате раунда победитель не&nbsp;выявлен, командам не&nbsp;хватает очков, то&nbsp;наступает
          новый раунд. Так до&nbsp;тех пор, пока не&nbsp;будет выявлен победитель
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
