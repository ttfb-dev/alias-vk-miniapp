import {
  editStepWord,
  getWords,
  setInitState,
  setNextStep,
  setNextWord,
  setStepHistory,
  setStepWord,
  stepEnd,
  stepStart,
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
