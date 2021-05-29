import { queryStringParse } from '../../helpers';

const hashParams = queryStringParse(window.location.hash);

const initialState = {
  status: '',
  roomId: hashParams.roomId ? parseInt(hashParams.roomId, 10) : null,
  memberIds: [],
  ownerId: '',
  myTeamId: null,
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

    case 'room/team_join':
    case 'room/team_leave':
    case 'room/team_create':
    case 'room/team_delete':
    case 'room/join_team_error':
    case 'room/leave_team_error':
    case 'room/team_create_error':
    case 'room/team_delete_error':
      return state;
    case 'room/join_team_success':
    case 'room/leave_team_success': {
      return {
        ...state,
        myTeamId: payload.myTeamId,
      };
    }
    case 'room/user_joined_team':
    case 'room/user_left_team':
    case 'room/team_created':
    case 'room/team_deleted': {
      return {
        ...state,
        teams: payload.teams,
      };
    }

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
        memberIds: payload.memberIds,
      };
    }

    default:
      return state;
  }
};

export { reducer };
