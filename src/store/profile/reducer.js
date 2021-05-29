const initialState = {
  sets: [],
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case 'profile/get_game_datasets_success':
    case 'profile/activate_dataset_success':
    case 'profile/deactivate_dataset_success':
    case 'profile/buy_game_dataset_success': {
      const sets = payload.datasets.filter((set) => set.status !== 'available_to_buy');
      const availableSets = payload.datasets.filter((set) => set.status === 'available_to_buy');

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
