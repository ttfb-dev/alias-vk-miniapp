import {
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
} from './action';
import { reducer } from './reducer';

const game = {
  action: {
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
  },
  reducer,
};

export { game };
