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

const initialState = {
  stepCount: null,
  roundCount: null,
  steps: [],
  stepCurrent: {},
  score: [],
  scoreCurrent: {},
  words: [],
  wordsCurrent: [],
  status: '',
  stepStart: null,
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case 'game/state':
      return {
        ...state,
        ...payload,
      };

    case stepCount.type:
      return {
        ...state,
        ...payload,
      };
    case roundCount.type:
      return state;
    case steps.type:
      return state;
    case stepCurrent.type:
      return state;
    case score.type:
      return state;
    case scoreCurrent.type:
      return state;
    case words.type:
      return state;
    case wordsCurrent.type:
      return state;
    case status.type:
      return state;
    case stepStart.type:
      return state;

    default:
      return state;
  }
};

export { reducer };
