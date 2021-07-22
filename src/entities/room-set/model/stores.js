import { actions } from './events';

const initialState = {
  sets: [],
  availableSets: [],
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case 'room/state':
    case 'room/user_left':
    case 'room/dataset_purchased': {
      const { gameWordDatasets } = payload;

      const sets = gameWordDatasets.filter((set) => ['active', 'inactive'].includes(set.status));
      const availableSets = gameWordDatasets.filter((set) => set.status === 'available');

      return {
        ...state,
        sets,
        availableSets,
      };
    }

    case actions.activateSet.type: {
      const sets = state.sets.slice();
      const setIndex = sets.findIndex((set) => set.datasetId === payload.datasetId);

      sets[setIndex].status = 'active';

      return {
        ...state,
        sets,
      };
    }

    case actions.deactivateSet.type: {
      const sets = state.sets.slice();
      const setIndex = sets.findIndex((set) => set.datasetId === payload.datasetId);

      sets[setIndex].status = 'inactive';

      return {
        ...state,
        sets,
      };
    }

    default:
      return state;
  }
};

export { reducer };
