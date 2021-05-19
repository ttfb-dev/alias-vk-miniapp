const INITIAL_STATE = {
  data: null,
  user_id: null,
  level: '',
  status: '',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'log/send_init':
      return {
        ...state,
        ...action.payload,
        status: 'loading',
      };

    case 'log/send_success': {
      return {
        ...state,
        status: 'done',
      };
    }

    default:
      return state;
  }
};

export { reducer };
