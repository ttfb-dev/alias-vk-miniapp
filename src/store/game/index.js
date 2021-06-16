import {
  setInitState,
  stepStart,
  getWords,
  setStepWord,
  editStepWord,
  setNextWord,
  setStepHistory,
  setNextStep,
  stepEnd,
} from './action';
import { reducer } from './reducer';

const game = {
  action: {
    setInitState,
    stepStart,
    getWords,
    setStepWord,
    editStepWord,
    setNextWord,
    setStepHistory,
    setNextStep,
    stepEnd,
  },
  reducer,
};

export { game };
