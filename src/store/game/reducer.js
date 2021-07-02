import {
  setInitState,
  setWords,
  stepEditWord,
  stepFinish,
  stepNext,
  stepSetHistory,
  stepSetNextWord,
  stepSetWord,
  stepStart,
} from './action';

const initState = {
  stepNumber: null,
  roundNumber: null,
  currentWord: {},
  statistics: [],
  statisticsList: {},
  step: {
    teamId: null,
    explainerId: null,
    guesserId: null,
    score: 0,
    words: [],
    startedAt: null,
  },
  history: [],
  words: [],
  wordsCount: null,
  status: '',
};

const reducer = (state = initState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case 'room/state': {
      const { stepNumber, roundNumber, status, step, history } = payload.game;

      const statisticsList = history.reduce((acc, step) => {
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

      return {
        ...state,
        stepNumber,
        roundNumber,
        status,
        step,
        history,
        statistics,
        statisticsList,
      };
    }

    case setInitState.type:
      return {
        ...state,
        ...payload,
      };

    case stepStart.type: {
      const { startedAt } = payload;

      return {
        ...state,
        status: 'step',
        step: {
          ...state.step,
          startedAt,
        },
      };
    }

    case stepFinish.type:
      return {
        ...state,
        status: 'lobby',
        step: {
          ...state.step,
          startedAt: null,
        },
      };

    case stepNext.type:
      return {
        ...state,
        ...payload,
      };

    case setWords.type: {
      const words = [...state.words, ...payload.words];
      const wordsCount = words.length;

      return {
        ...state,
        words,
        wordsCount,
      };
    }

    case stepSetWord.type: {
      const { word } = payload;

      const score = word.guessed ? state.step.score + 1 : state.step.score - 1;
      const words = [...state.step.words, word];

      return {
        ...state,
        step: {
          ...state.step,
          score,
          words,
        },
      };
    }

    case stepEditWord.type: {
      const { word, index } = payload;

      const score = word.guessed ? state.step.score + 2 : state.step.score - 2;
      const words = [...state.step.words.slice(0, index), word, ...state.step.words.slice(index + 1)];

      return {
        ...state,
        step: {
          ...state.step,
          score,
          words,
        },
      };
    }

    case stepSetNextWord.type: {
      const words = state.words.slice();
      const currentWord = words.shift();
      const wordsCount = words.length;

      return {
        ...state,
        currentWord,
        words,
        wordsCount,
      };
    }

    case stepSetHistory.type: {
      const step = { ...state.step };
      const history = [...state.history, step];

      const statisticsList = history.reduce((acc, step) => {
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

      return {
        ...state,
        history,
        statistics,
        statisticsList,
      };
    }

    default:
      return state;
  }
};

export { reducer };
