import { getSets, activateSet, deactivateSet, buySet } from './action';
import { reducer } from './reducer';

const profile = {
  action: { getSets, activateSet, deactivateSet, buySet },
  reducer,
};

export { profile };
