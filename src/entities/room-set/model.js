import { useSelector } from 'react-redux';
import { defineAction } from '@logux/actions';

import { store } from '@/store';

const toggleSet = defineAction('room/toggle_dataset');
const activateSet = defineAction('room/activate_game_dataset');
const deactivateSet = defineAction('room/deactivate_game_dataset');

export const creators = {
  toggleSet,
  activateSet,
  deactivateSet,
};

export const actions = {
  toggleSet: (id) => store.dispatch.sync(toggleSet({ id })),
};

export const selectors = {
  useSets: () => {
    return useSelector((store) => store.roomNew.sets);
  },

  useSet: (id) => {
    return useSelector((store) => store.roomNew.sets.find((set) => set?.datasetId === id));
  },

  usePurchasedSets: () => {
    return useSelector((store) => store.roomNew.sets.filter((set) => ['active', 'inactive'].includes(set?.status)));
  },

  useAvailableSets: () => {
    return useSelector((store) => store.roomNew.sets.filter((set) => set?.status === 'available'));
  },

  useActiveSets: () => {
    return useSelector((store) => store.roomNew.sets.filter((set) => set?.status === 'active').length);
  },
};

const initialState = [];

export const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case 'room/state': {
      const {
        room: { gameWordDatasets },
      } = payload;

      return gameWordDatasets;
    }

    case 'room/user_left':
    case 'room/user_joined':
    case 'room/dataset_purchased': {
      const { gameWordDatasets } = payload;

      return gameWordDatasets;
    }

    case creators.activateSet.type: {
      const sets = state.sets.slice();
      const setIndex = sets.findIndex((set) => set.datasetId === payload.datasetId);

      sets[setIndex].status = 'active';

      return {
        ...state,
        sets,
      };
    }

    case creators.deactivateSet.type: {
      const sets = state.sets.slice();
      const setIndex = sets.findIndex((set) => set.datasetId === payload.datasetId);

      sets[setIndex].status = 'inactive';

      return {
        ...state,
        sets,
      };
    }

    case creators.toggleSet.type: {
      const { id } = payload;

      const sets = state.slice();
      const setIndex = sets.findIndex((set) => set?.datasetId === id);
      const togglingSet = JSON.parse(JSON.stringify(sets[setIndex]));
      togglingSet.status = togglingSet.status === 'active' ? 'inactive' : 'active';
      sets[setIndex] = togglingSet;

      return sets;
    }

    default:
      return state;
  }
};
