import { defineAction } from '@logux/actions';

const setStep = defineAction('game/setStep');
const setStepHistory = defineAction('game/setStepHistory');
const setWords = defineAction('game/setWords');
const setStatus = defineAction('game/setStatus');
const setTimestamp = defineAction('game/setTimestamp');

export { setStep, setStepHistory, setWords, setStatus, setTimestamp };
