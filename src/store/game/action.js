import { defineAction } from '@logux/actions';

const stepStart = defineAction('game/step_start');
const getWords = defineAction('game/get_words');
const setWords = defineAction('game/set_words');
const setStepWord = defineAction('game/set_step_word');
const setNextWord = defineAction('game/set_next_word');
const setStepHistory = defineAction('game/set_step_history');
const setNextStep = defineAction('game/set_next_step');
const stepEnd = defineAction('game/step_end');

export { stepStart, getWords, setWords, setStepWord, setNextWord, setStepHistory, setNextStep, stepEnd };
