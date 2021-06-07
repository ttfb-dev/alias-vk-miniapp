import { setStep, setStepHistory, setWords, setStatus, setTimestamp } from './action';
import { reducer } from './reducer';

const game = {
  action: {
    setStep,
    setStepHistory,
    setWords,
    setStatus,
    setTimestamp,
  },
  reducer,
};

export { game };
