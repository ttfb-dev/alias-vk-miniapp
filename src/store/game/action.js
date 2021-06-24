import { defineAction } from '@logux/actions';

const setInitState = defineAction('game/set_init_state');
const start = defineAction('game/start');
const finish = defineAction('game/finish');

const getWords = defineAction('step/get_words');
const setWords = defineAction('step/set_words');
const stepStart = defineAction('step/start');
const stepFinish = defineAction('step/finish');
const stepNext = defineAction('step/next');
const stepSetWord = defineAction('step/set_word');
const stepEditWord = defineAction('step/edit_word');
const stepSetNextWord = defineAction('step/set_next_word');
const stepSetHistory = defineAction('step/set_history');

export {
  finish,
  getWords,
  setInitState,
  setWords,
  start,
  stepEditWord,
  stepFinish,
  stepNext,
  stepSetHistory,
  stepSetNextWord,
  stepSetWord,
  stepStart,
};
