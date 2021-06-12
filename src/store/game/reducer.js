import { stepStart, setWord, setStepWord, setStep, setStepHistory, setWords, stepEnd } from './action';

const initialState = {
  stepNumber: null,
  roundNumber: null,
  step: null,
  stepHistory: null,
  currentWord: null,
  words: [
    { word: 'философия', index: 640, guessed: null },
    { word: 'фартук', index: 708, guessed: null },
    { word: 'алохомора', index: 100040, guessed: null },
    { word: 'плантация', index: 321, guessed: null },
    { word: 'стержень', index: 947, guessed: null },
    { word: 'уголь', index: 144, guessed: null },
    { word: 'гренки', index: 597, guessed: null },
    { word: 'кафе', index: 663, guessed: null },
    { word: 'экспеллиармус', index: 100031, guessed: null },
    { word: 'горшок', index: 743, guessed: null },
    { word: 'Пушкин', index: 46, guessed: null },
    { word: 'золото', index: 542, guessed: null },
    { word: 'парковка', index: 795, guessed: null },
    { word: 'обезъянка', index: 82, guessed: null },
    { word: 'улыбка', index: 273, guessed: null },
    { word: 'бассейн', index: 790, guessed: null },
    { word: 'успех', index: 444, guessed: null },
    { word: 'реклама', index: 931, guessed: null },
    { word: 'ночь', index: 464, guessed: null },
    { word: 'налог', index: 917, guessed: null },
  ],
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

      return { ...state, currentWord, words };
    }

    case setStepWord.type: {
      const words = [...(state.step.words ?? []), payload.word];

      return { ...state, step: { ...state.step, words } };
    }

    case setStep.type:
      return { ...state, ...payload };

    case setStepHistory.type:
      return state;

    case setWords.type:
      return { ...state, words: [...state.words, ...payload.words] };

    case stepEnd.type:
      return state;

    default:
      return state;
  }
};

export { reducer };
