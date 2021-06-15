import {
  stepStart,
  setWords,
  setStepWord,
  editStepWord,
  setNextWord,
  setNextStep,
  setStepHistory,
  stepEnd,
} from './action';

const initialState = {
  stepNumber: null,
  roundNumber: null,
  step: null,
  stepHistory: null,
  currentWord: null,
  words: [],
  wordsCount: null,
  status: '',
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case 'game/state': {
      return { ...state, ...payload.game };
    }

    case stepStart.type: {
      const { startedAt } = payload;

      return { ...state, status: 'step', step: { ...state.step, startedAt } };
    }

    case setWords.type: {
      const words = [...state.words, ...payload.words];
      const wordsCount = words.length;

      return { ...state, words, wordsCount };
    }

    case setStepWord.type: {
      const { word } = payload;

      const score = word.guessed ? state.step.score + 1 : state.step.score - 1;
      const words = [...state.step.words, word];

      return { ...state, step: { ...state.step, score, words } };
    }

    case editStepWord.type: {
      const { word, index } = payload;

      const score = word.guessed ? state.step.score + 1 : state.step.score - 1;
      const words = [...state.step.words.slice(0, index), word, ...state.step.words.slice(index + 1)];

      return { ...state, step: { ...state.step, score, words } };
    }

    case setNextWord.type: {
      const words = state.words.slice();
      const currentWord = words.shift();
      const wordsCount = words.length;

      return { ...state, currentWord, words, wordsCount };
    }

    case setNextStep.type:
      return { ...state, ...payload };

    case setStepHistory.type:
      return state;

    case stepEnd.type: {
      return { ...state, status: 'lobby', step: { ...state.step, startedAt: null } };
    }

    default:
      return state;
  }
};

export { reducer };
