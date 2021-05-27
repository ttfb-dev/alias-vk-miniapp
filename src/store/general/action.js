import { defineAction } from '@logux/actions';

const route = defineAction('general/route');
const setFriends = defineAction('general/set_friends');
const setMembers = defineAction('general/set_members');

export { route, setFriends, setMembers };
