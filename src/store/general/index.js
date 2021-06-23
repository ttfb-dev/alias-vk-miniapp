import { alert, route, setFriends, setUserId } from './action';
import { reducer } from './reducer';

const general = {
  action: { route, alert, setUserId, setFriends },
  reducer,
};

export { general };
