const initialState = {
  status: 'initial',
  roomId: null,
  members: [],
  owner: '',
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  // console.log(type, payload);

  switch (type) {
    case 'room/create':
      return {
        ...state,
        status: 'loading',
      };
    case 'room/create_error':
      return {
        ...state,
        status: 'error',
      };
    case 'room/create_success': {
      return {
        ...state,
        status: 'success',
        ...payload,
      };
    }

    case 'room/join':
      return {
        ...state,
        status: 'loading',
      };
    case 'room/join_error':
      return {
        ...state,
        status: 'error',
      };
    case 'room/join_success':
      return {
        ...state,
        status: 'success',
      };

    case 'room/leave':
      return {
        ...state,
        status: 'loading',
        roomId: null,
      };
    case 'room/leave_error':
      return {
        ...state,
        status: 'error',
      };
    case 'room/leave_success':
      return {
        ...state,
        status: 'success',
      };

    case 'room/where_i_am':
      return {
        ...state,
        status: 'loading',
      };
    case 'room/where_i_am_error':
      return {
        ...state,
        status: 'error',
      };
    case 'room/where_i_am_success':
      return {
        ...state,
        status: 'success',
        ...payload,
      };

    default:
      return state;
  }
};

export { reducer };
