import { defineAction } from '@logux/actions';

const setRoomId = defineAction('room/setRoomId');
const setMembers = defineAction('room/setMembers');
const create = defineAction('room/create');
const join = defineAction('room/join');
const leave = defineAction('room/leave');
const whereIAm = defineAction('room/where_i_am');
const teamChange = defineAction('room/team_change');
const teamJoin = defineAction('room/team_join');
const teamLeave = defineAction('room/team_leave');
const teamCreate = defineAction('room/team_create');
const teamDelete = defineAction('room/team_delete');
const activateSet = defineAction('room/activate_game_dataset');
const deactivateSet = defineAction('room/deactivate_game_dataset');

export {
  activateSet,
  create,
  deactivateSet,
  join,
  leave,
  setMembers,
  setRoomId,
  teamChange,
  teamCreate,
  teamDelete,
  teamJoin,
  teamLeave,
  whereIAm,
};
