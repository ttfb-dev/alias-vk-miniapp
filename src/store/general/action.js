import { defineAction } from '@logux/actions';

const route = defineAction('general/route');
const setUserId = defineAction('general/setUserId');
const setFriends = defineAction('general/setFriends');

export { route, setUserId, setFriends };
