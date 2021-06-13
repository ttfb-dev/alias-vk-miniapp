import { defineAction } from '@logux/actions';

const route = defineAction('general/route');
const alert = defineAction('general/alert');
const setUserId = defineAction('general/setUserId');
const setFriends = defineAction('general/setFriends');

export { route, alert, setUserId, setFriends };
