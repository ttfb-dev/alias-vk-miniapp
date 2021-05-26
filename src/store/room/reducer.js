import { queryStringParse } from '../../helpers';

const hashParams = queryStringParse(window.location.hash);

const initialState = {
  status: '',
  roomId: hashParams.roomId ? parseInt(hashParams.roomId, 10) : null,
  members: [],
  owner: '',
  myTeam: null,
  settings: null,
  teams: [],
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case 'room/create':
    case 'room/create_error':
      return state;
    case 'room/create_success': {
      return {
        ...state,
        ...payload,
      };
    }

    case 'room/join':
    case 'room/join_error':
      return state;
    case 'room/join_success':
      return {
        ...state,
        ...payload,
      };

    case 'room/leave':
    case 'room/leave_error':
      return state;
    case 'room/leave_success':
      return {
        ...state,
        ...payload,
      };

    case 'room/where_i_am':
    case 'room/where_i_am_error':
      return state;
    case 'room/where_i_am_success':
      return {
        ...state,
        ...payload,
      };

    case 'room/state': {
      return {
        ...state,
        ...payload.room,
      };
    }

    case 'room/user_joined':
    case 'room/user_left': {
      return {
        ...state,
        members: payload.members,
      };
    }

    default:
      return state;
  }
};

export { reducer };
