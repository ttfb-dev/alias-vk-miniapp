import { defineAction } from '@logux/actions';

const route = defineAction('general/route');
const setUserId = defineAction('general/setUserId');
const setFriends = defineAction('general/setFriends');
const setMembers = defineAction('general/setMembers');

export { route, setUserId, setFriends, setMembers };
