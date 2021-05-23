import { defineAction } from '@logux/actions';

const create = defineAction('room/create');
const join = defineAction('room/join');
const leave = defineAction('room/leave');
const whereIAm = defineAction('room/where_i_am');

export { create, join, leave, whereIAm };
