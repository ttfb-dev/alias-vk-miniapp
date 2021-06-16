import {
  setInitState,
  stepStart,
  setWords,
  setStepWord,
  editStepWord,
  setNextWord,
  setNextStep,
  setStepHistory,
  stepEnd,
} from './action';

const initState = {
  stepNumber: null,
  roundNumber: null,
  statistics: [],
  statisticsList: {},
  step: {},
  stepHistory: [],
  currentWord: {},
  words: [],
  wordsCount: null,
  status: '',
};

const reducer = (state = initState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case 'game/state': {
      const stepHistory = payload.game.stepHistory.slice();
      const statisticsList = stepHistory.reduce((acc, step) => {
        if (acc[step.teamId]) {
          acc[step.teamId].id = step.teamId;
          acc[step.teamId].score += step.score;
        } else {
          acc[step.teamId] = {};
          acc[step.teamId].id = step.teamId;
          // при инициализации score = undefined, поэтому используется этот хак
          acc[step.teamId].score = ~~acc[step.teamId].score + step.score;
        }

        return acc;
      }, {});

      const statistics = Object.values(statisticsList).sort((prev, next) => next.score - prev.score);

      return { ...state, ...payload.game, statistics, statisticsList };
    }

    case setInitState.type:
      return { ...initState };

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

    case setStepHistory.type: {
      const step = { ...state.step };
      const stepHistory = [...state.stepHistory, step];
      const statisticsList = stepHistory.reduce((acc, step) => {
        if (acc[step.teamId]) {
          acc[step.teamId].id = step.teamId;
          acc[step.teamId].score += step.score;
        } else {
          acc[step.teamId] = {};
          acc[step.teamId].id = step.teamId;
          // при инициализации score = undefined, поэтому используется этот хак
          acc[step.teamId].score = ~~acc[step.teamId].score + step.score;
        }

        return acc;
      }, {});

      const statistics = Object.values(statisticsList).sort((prev, next) => next.score - prev.score);

      return { ...state, stepHistory, statistics, statisticsList };
    }

    case stepEnd.type: {
      return { ...state, status: 'lobby', step: { ...state.step, startedAt: null } };
    }

    default:
      return state;
  }
};

export { reducer };
