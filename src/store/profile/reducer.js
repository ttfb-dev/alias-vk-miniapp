const initialState = {
  sets: [],
  availableSets: [],
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case 'profile/get_game_datasets_success':
    case 'profile/activate_dataset_success':
    case 'profile/deactivate_dataset_success':
    case 'profile/buy_game_dataset_success': {
      const sets = payload.datasets.filter((set) => ['active', 'inactive'].includes(set.status));
      const availableSets = payload.datasets.filter((set) => set.status === 'available');

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
