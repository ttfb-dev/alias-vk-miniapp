import { stepStart, getWords, setStepWord, setNextWord, setStepHistory, setNextStep, stepEnd } from './action';
import { reducer } from './reducer';

const game = {
  action: {
    stepStart,
    getWords,
    setStepWord,
    setNextWord,
    setStepHistory,
    setNextStep,
    stepEnd,
  },
  reducer,
};

export { game };
