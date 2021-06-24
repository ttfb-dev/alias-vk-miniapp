import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Div, Group, Header, Placeholder, SimpleCell, Switch } from '@vkontakte/vkui';

import { game } from '@/store';

import './Words.scss';
import styles from './Words.module.scss';

export const Words = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const step = useSelector((state) => state.game.step);

  const isExplainer = useMemo(() => userId === step?.explainerId, [userId, step]);

  const onEditWord = (word, index) => {
    const newWord = { ...word, guessed: !word.guessed };

    dispatch.sync(game.action.stepEditWord({ word: newWord, index }));
  };

  return (
    <Div className={styles.container}>
      <Group mode='plain' separator='hide'>
        <Header mode='tertiary' className='headerCentered'>
          Отыгравшие слова
        </Header>
        {step?.words && !!step.words.length ? (
          step.words.map((word, index) => (
            <SimpleCell
              key={word.index}
              hasActive={false}
              hasHover={false}
              after={<Switch disabled={!isExplainer} checked={word.guessed} onChange={() => onEditWord(word, index)} />}
            >
              {word.value}
            </SimpleCell>
          ))
        ) : (
          <Placeholder>Здесь будут отображаться слова, которые отыграли в текущем ходе</Placeholder>
        )}
      </Group>
    </Div>
  );
};
