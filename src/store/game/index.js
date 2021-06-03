import {
  stepCount,
  roundCount,
  steps,
  stepCurrent,
  score,
  scoreCurrent,
  words,
  wordsCurrent,
  status,
  stepStart,
} from './action';
import { reducer } from './reducer';

const game = {
  action: {
    stepCount,
    roundCount,
    steps,
    stepCurrent,
    score,
    scoreCurrent,
    words,
    wordsCurrent,
    status,
    stepStart,
  },
  reducer,
};

export { game };
