import { stepStart, setWord, setStepWord, setStep, setStepHistory, getWords, stepEnd } from './action';
import { reducer } from './reducer';

const game = {
  action: {
    stepStart,
    setWord,
    setStepWord,
    setStep,
    setStepHistory,
    getWords,
    stepEnd,
  },
  reducer,
};

export { game };
