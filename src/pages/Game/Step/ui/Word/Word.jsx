import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CellButton, Div, Group, Header, Spacing } from '@vkontakte/vkui';

import { game } from '@/store';

import styles from './Word.module.scss';

let wordStartAt;

export const Word = () => {
  const dispatch = useDispatch();
  const currentWord = useSelector((state) => state.game.currentWord);
  const wordsCount = useSelector((state) => state.game.wordsCount);

  useEffect(() => {
    wordStartAt = Date.now();
  }, [currentWord]);

  const onSetWord = (guessed) => {
    dispatch.sync({
      type: 'analytics/send',
      event: 'word.guessing_duration',
      data: { word: currentWord.value, wordIndex: currentWord.index, guessed, duration: Date.now() - wordStartAt },
    });

    const word = { ...currentWord, guessed };

    dispatch.sync(game.action.stepSetWord({ word }));

    dispatch(game.action.stepSetNextWord());

    if (wordsCount <= 5) {
      dispatch.sync(game.action.getWords());
    }
  };

  return (
    <Div className={styles.container}>
      <Header mode='tertiary' className='headerCentered'>
        Ваше слово
      </Header>

      <span className={styles.word}>{currentWord?.value ?? ''}</span>

      <Group mode='plain' separator='hide'>
        <Button stretched mode='primary' size='l' onClick={() => onSetWord(true)}>
          Угадал
        </Button>
        <Spacing size={12} />
        <CellButton centered hasActive={false} mode='danger' onClick={() => onSetWord(false)}>
          Пропустить
        </CellButton>
      </Group>
    </Div>
  );
};
