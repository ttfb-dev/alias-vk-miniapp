import { setRoomId, setMembers, create, join, leave, whereIAm } from './action';

const initialState = {
  status: '',
  roomId: null,
  memberIds: [],
  members: [],
  ownerId: '',
  myTeamId: null,
  settings: null,
  teams: [],
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case setRoomId.type:
      return {
        ...state,
        ...payload,
      };

    case setMembers.type:
      return {
        ...state,
        ...payload,
      };

    case create.type:
    case `${create.type}_error`:
      return state;
    case `${create.type}_success`:
      return {
        ...state,
        ...payload,
      };

    case join.type:
      return {
        ...state,
        ...payload,
      };

    case `${join.type}_error`:
      return state;
    case `${join.type}_success`:
      return {
        ...state,
        ...payload,
      };

    case leave.type:
    case `${leave.type}_error`:
      return state;
    case `${leave.type}_success`:
      return {
        ...state,
        ...payload,
      };

    case whereIAm.type:
    case `${whereIAm.type}_error`:
      return state;
    case `${whereIAm.type}_success`:
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
      };
    }
    case 'room/user_joined_team':
    case 'room/user_left_team':
    case 'room/team_created':
    case 'room/team_deleted': {
      return {
        ...state,
        ...payload,
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
      };
    }

    default:
      return state;
  }
};

export { reducer };
