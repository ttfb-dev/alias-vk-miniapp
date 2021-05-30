import { route, setUserId, setFriends } from './action';
import { reducer } from './reducer';

const general = {
  action: {
    route,
    setUserId,
    setFriends,
  },
  reducer,
};

export { general };
