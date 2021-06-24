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
    editStepWord,
    getWords,
    setInitState,
    setNextStep,
    setNextWord,
    setStepHistory,
    setStepWord,
    stepEnd,
    stepStart,
  },
  reducer,
};

export { game };
