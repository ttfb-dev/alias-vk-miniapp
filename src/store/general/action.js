import { defineAction } from '@logux/actions';

const setUserId = defineAction('general/setUserId');
const setFriends = defineAction('general/setFriends');

export { setFriends, setUserId };
