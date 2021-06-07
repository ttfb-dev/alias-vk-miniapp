import { defineAction } from '@logux/actions';

const setStepNumber = defineAction('game/setStepNumber');
const setRoundNumber = defineAction('game/setRoundNumber');
const setStep = defineAction('game/setStep');
const setStepHistory = defineAction('game/setStepHistory');
const setWords = defineAction('game/setWords');
const setStatus = defineAction('game/setStatus');
const setTimestamp = defineAction('game/setTimestamp');

export { setStepNumber, setRoundNumber, setStep, setStepHistory, setWords, setStatus, setTimestamp };
