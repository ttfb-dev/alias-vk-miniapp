import { queryStringParse } from '../../helpers';

const hashParams = queryStringParse(window.location.hash);

const initialState = {
  status: 'initial',
  roomId: hashParams.roomId ? parseInt(hashParams.roomId, 10) : null,
  members: [],
  owner: '',
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

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
        ...payload,
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
        ...payload,
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
