import { setFriends, setUserId } from './action';
import { reducer } from './reducer';

const general = {
  action: { setUserId, setFriends },
  reducer,
};

export { general };
