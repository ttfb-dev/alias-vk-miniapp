import { defineAction } from '@logux/actions';

const setStep = defineAction('game/set_step');
const setStepHistory = defineAction('game/setStepHistory');
const setWords = defineAction('game/setWords');
const setStatus = defineAction('game/setStatus');
const setTimestamp = defineAction('game/set_timestamp');

export { setStep, setStepHistory, setWords, setStatus, setTimestamp };
