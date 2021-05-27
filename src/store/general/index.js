import { route, setFriends, setMembers } from './action';
import { reducer } from './reducer';

const general = {
  action: {
    route,
    setFriends,
    setMembers,
  },
  reducer,
};

export { general };
