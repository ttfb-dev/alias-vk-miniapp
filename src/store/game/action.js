import { defineAction } from '@logux/actions';

const stepStart = defineAction('game/step_start');
const setWord = defineAction('game/set_word');
const setStepWord = defineAction('game/set_step_word');
const setStep = defineAction('game/set_step');
const setStepHistory = defineAction('game/setStepHistory');
const setWords = defineAction('game/set_words');
const getWords = defineAction('game/get_words');
const stepEnd = defineAction('game/step_end');

export { stepStart, setWord, setStepWord, setStep, setStepHistory, setWords, getWords, stepEnd };
