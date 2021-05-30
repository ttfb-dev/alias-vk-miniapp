import { route, setUserId, setFriends, setMembers } from './action';
import { reducer } from './reducer';

const general = {
  action: {
    route,
    setUserId,
    setFriends,
    setMembers,
  },
  reducer,
};

export { general };
