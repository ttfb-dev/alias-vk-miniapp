import { setStepNumber, setRoundNumber, setStep, setStepHistory, setWords, setStatus, setTimestamp } from './action';
import { reducer } from './reducer';

const game = {
  action: {
    setStepNumber,
    setRoundNumber,
    setStep,
    setStepHistory,
    setWords,
    setStatus,
    setTimestamp,
  },
  reducer,
};

export { game };
