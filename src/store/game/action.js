import { defineAction } from '@logux/actions';

const stepCount = defineAction('game/stepCount');
const roundCount = defineAction('game/RoundCount');
const steps = defineAction('game/steps');
const stepCurrent = defineAction('game/stepCurrent');
const score = defineAction('game/score');
const scoreCurrent = defineAction('game/scoreCurrent');
const words = defineAction('game/words');
const wordsCurrent = defineAction('game/wordsCurrent');
const status = defineAction('game/status');
const stepStart = defineAction('game/stepStart');

export { stepCount, roundCount, steps, stepCurrent, score, scoreCurrent, words, wordsCurrent, status, stepStart };
