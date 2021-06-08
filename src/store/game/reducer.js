import { setStep, setStepHistory, setWords, setStatus, setTimestamp } from './action';

const initialState = {
  stepNumber: null,
  roundNumber: null,
  step: null,
  stepHistory: null,
  words: [],
  status: '',
  timestamp: Date.now(),
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case 'game/state':
      return {
        ...state,
        ...payload.game,
      };

    case setStep.type:
      return {
        ...state,
        ...payload,
      };
    case setStepHistory.type:
      return state;
    case setWords.type:
      return state;
    case setStatus.type:
      return state;
    case setTimestamp.type:
      return state;

    default:
      return state;
  }
};

export { reducer };
