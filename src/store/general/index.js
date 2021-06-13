import { route, alert, setUserId, setFriends } from './action';
import { reducer } from './reducer';

const general = {
  action: { route, alert, setUserId, setFriends },
  reducer,
};

export { general };
