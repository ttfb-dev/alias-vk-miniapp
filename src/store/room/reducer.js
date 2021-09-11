import {
  activateSet,
  create,
  deactivateSet,
  join,
  leave,
  setMembers,
  setRoomId,
  // teamCreate,
  // teamDelete,
  // teamJoin,
  // teamLeave,
  teamChange,
  updateSettings,
  whereIAm,
} from './action';

const initialState = {
  status: '',
  roomId: null,
  members: [],
  membersList: {},
  sets: [],
  availableSets: [],
  ownerId: null,
  myTeamId: null,
  settings: {},
  teams: [],
  teamsList: {},
  teamsCompleted: 0,
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case 'room/state': {
      const { gameWordDatasets, members, teams, ...room } = payload.room;
      const membersList = members.reduce((list, member) => ({ ...list, [member.id]: member }), {});
      const sets = gameWordDatasets.filter((set) => ['active', 'inactive'].includes(set.status));
      const availableSets = gameWordDatasets.filter((set) => set.status === 'available');
      const teamsList = teams.reduce((list, team) => ({ ...list, [team.teamId]: team }), {});
      const teamsCompleted = teams.reduce((acc, team) => (acc += team.memberIds.length > 1), 0);

      return {
        ...state,
        ...room,
        members,
        membersList,
        teams,
        teamsList,
        teamsCompleted,
        sets,
        availableSets,
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

    case teamChange.type: {
      const { teams } = payload;
      const teamsList = teams.reduce((list, team) => ({ ...list, [team.teamId]: team }), {});
      const teamsCompleted = teams.reduce((acc, team) => (acc += team.memberIds.length > 1), 0);

      return {
        ...state,
        teams,
        teamsList,
        teamsCompleted,
      };
    }
    case `${teamChange.type}_success`:
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
      const { teams } = payload;
      const teamsList = teams.reduce((list, team) => ({ ...list, [team.teamId]: team }), {});
      const teamsCompleted = teams.reduce((acc, team) => (acc += team.memberIds.length > 1), 0);

      return {
        ...state,
        teams,
        teamsList,
        teamsCompleted,
      };
    }

    case 'room/user_joined':
    case 'room/user_left': {
      const { gameWordDatasets, members, teams } = payload;
      const membersList = members.reduce((list, member) => ({ ...list, [member.id]: member }), {});
      const sets = gameWordDatasets.filter((set) => ['active', 'inactive'].includes(set.status));
      const availableSets = gameWordDatasets.filter((set) => set.status === 'available');
      const teamsList = teams.reduce((list, team) => ({ ...list, [team.teamId]: team }), {});
      const teamsCompleted = teams.reduce((acc, team) => (acc += team.memberIds.length > 1), 0);

      return {
        ...state,
        members,
        membersList,
        teams,
        teamsList,
        teamsCompleted,
        sets,
        availableSets,
      };
    }

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
      const { gameWordDatasets } = payload;
      const sets = gameWordDatasets.filter((set) => ['active', 'inactive'].includes(set.status));
      const availableSets = gameWordDatasets.filter((set) => set.status === 'available');

      return {
        ...state,
        sets,
        availableSets,
      };
    }

    case 'game/start':
      return {
        ...state,
        status: 'game',
      };

    case 'game/finish':
      return {
        ...state,
        status: 'lobby',
      };

    case updateSettings.type:
      const { settings } = payload;
      return {
        ...state,
        settings,
      };

    default:
      return state;
  }
};

export { reducer };
