import { defineAction } from '@logux/actions';

const route = defineAction('general/route');
const setFriends = defineAction('general/set_friends');

export { route, setFriends };
