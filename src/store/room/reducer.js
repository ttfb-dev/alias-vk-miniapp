import { setRoomId, setMembers, create, join, leave, whereIAm, activateSet, deactivateSet, startGame } from './action';

const initialState = {
  status: '',
  roomId: null,
  memberIds: [],
  members: [],
  membersList: null,
  sets: [],
  availableSets: [],
  ownerId: '',
  myTeamId: null,
  settings: null,
  teams: [],
  teamsList: null,
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case 'room/state': {
      const sets = payload.room.gameWordDatasets.filter((set) => ['active', 'inactive'].includes(set.status));
      const availableSets = payload.room.gameWordDatasets.filter((set) => set.status === 'available');
      const teamsList = payload.room.teams.reduce((list, team) => ({ ...list, [team.teamId]: team }), {});

      return {
        ...state,
        ...payload.room,
        sets,
        availableSets,
        teamsList,
      };
    }

    case setRoomId.type:
      return {
        ...state,
        ...payload,
      };

    case setMembers.type: {
      const membersList = payload.members.reduce((list, member) => ({ ...list, [member.id]: member }), {});

      return {
        ...state,
        ...payload,
        membersList,
      };
    }

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
    case 'room/leave_team_success':
      return {
        ...state,
        ...payload,
      };

    case 'room/user_joined_team':
    case 'room/user_left_team':
    case 'room/team_created':
    case 'room/team_deleted': {
      const teamsList = payload.teams.reduce((list, team) => ({ ...list, [team.teamId]: team }), {});

      return {
        ...state,
        ...payload,
        teamsList,
      };
    }

    case 'room/user_joined':
    case 'room/user_left':
      return {
        ...state,
        memberIds: payload.memberIds,
      };

    case activateSet.type: {
      const sets = state.sets.slice();
      const setIndex = sets.findIndex((set) => set.datasetId === payload.datasetId);

      sets[setIndex].status = 'active';

      return {
        ...state,
        sets,
      };
    }
    case deactivateSet.type: {
      const sets = state.sets.slice();
      const setIndex = sets.findIndex((set) => set.datasetId === payload.datasetId);

      sets[setIndex].status = 'inactive';

      return {
        ...state,
        sets,
      };
    }

    case 'room/dataset_purchased': {
      const sets = payload.gameWordDatasets.filter((set) => ['active', 'inactive'].includes(set.status));
      const availableSets = payload.gameWordDatasets.filter((set) => set.status === 'available');

      return {
        ...state,
        sets,
        availableSets,
      };
    }

    case startGame.type:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export { reducer };
