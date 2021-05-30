import { defineAction } from '@logux/actions';

const setRoomId = defineAction('room/roomId');
const create = defineAction('room/create');
const join = defineAction('room/join');
const leave = defineAction('room/leave');
const whereIAm = defineAction('room/where_i_am');
const teamJoin = defineAction('room/team_join');
const teamLeave = defineAction('room/team_leave');
const teamCreate = defineAction('room/team_create');
const teamDelete = defineAction('room/team_delete');

export { setRoomId, create, join, leave, whereIAm, teamJoin, teamLeave, teamCreate, teamDelete };
