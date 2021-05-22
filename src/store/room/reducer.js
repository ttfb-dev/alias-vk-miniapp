const initialState = {
  status: '',
  roomId: null,
  members: [],
  owner: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    case 'room/create_success':
      return {
        ...state,
        status: 'success',
        ...action.payload,
      };

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
        ...action.payload,
      };

    default:
      return state;
  }
};

export { reducer };
