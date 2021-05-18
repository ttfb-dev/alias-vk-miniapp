const INITIAL_STATE = {
  status: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'server/ping':
      return {
        ...state,
        status: 'test',
      };

    default:
      return state;
  }
};

export { reducer };
