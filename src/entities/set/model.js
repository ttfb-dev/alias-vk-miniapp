import { useSelector } from 'react-redux';
import { defineAction } from '@logux/actions';

import { store } from '@/store';

const getSets = defineAction('profile/get_game_datasets');
const toggleSet = defineAction('profile/toggle_dataset');
const activateSet = defineAction('profile/activate_dataset');
const deactivateSet = defineAction('profile/deactivate_dataset');
const datasetsChanged = defineAction('profile/datasets_changed');

export const creators = {
  getSets,
  toggleSet,
  activateSet,
  deactivateSet,
  datasetsChanged,
};

export const actions = {
  toggleSet: (id) => store.dispatch.sync(toggleSet({ id })),
};

export const selectors = {
  useSet: (id) => {
    return useSelector((store) => store.user.sets.find((set) => set?.datasetId === id));
  },

  usePurchasedSets: () => {
    return useSelector((store) => store.user.sets.filter((set) => ['active', 'inactive'].includes(set?.status)));
  },

  useAvailableSets: () => {
    return useSelector((store) => store.user.sets.filter((set) => set?.status === 'available'));
  },
};

const initialState = [];

export const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case `${creators.getSets.type}_success`:
    case `${creators.activateSet.type}_success`:
    case `${creators.deactivateSet.type}_success`:
    case `${creators.datasetsChanged.type}`: {
      const { datasets: sets } = payload;

      return sets;
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
