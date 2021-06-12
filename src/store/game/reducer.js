import { stepStart, setWord, setStepWord, setStep, setStepHistory, setWords, stepEnd } from './action';

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
      const { status, startedAt } = payload;

      return { ...state, status, step: { ...state.step, startedAt } };
    }

    case setWord.type: {
      const words = state.words.slice();
      const currentWord = words.shift();
      const wordsCount = words.length;

      return { ...state, currentWord, words, wordsCount };
    }

    case setStepWord.type: {
      const { word, index } = payload;

      let newWord;
      let words;
      if (Number.isInteger(index)) {
        newWord = { ...word, guessed: !word.guessed };
        words = [...state.step.words.slice(0, index), newWord, ...state.step.words.slice(index + 1)];
      } else {
        words = [...state.step.words, word];
      }

      return { ...state, step: { ...state.step, words } };
    }

    case setStep.type:
      return { ...state, ...payload };

    case setStepHistory.type:
      return state;

    case setWords.type: {
      const words = [...state.words, ...payload.words];
      const wordsCount = words.length;

      return { ...state, words, wordsCount };
    }

    case stepEnd.type:
      return state;

    default:
      return state;
  }
};

export { reducer };
