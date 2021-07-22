import { actions } from './events';

const initialState = {
  sets: [],
  availableSets: [],
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case `${actions.getSets.type}_success`:
    case `${actions.activateSet.type}_success`:
    case `${actions.deactivateSet.type}_success`: {
      const { datasets } = payload;

      const sets = datasets.filter((set) => ['active', 'inactive'].includes(set.status));
      const availableSets = datasets.filter((set) => set.status === 'available');

      return {
        ...state,
        sets,
        availableSets,
      };
    }

    default:
      return state;
  }
};

export { reducer };
