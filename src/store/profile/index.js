import { activateSet, buySet, deactivateSet, getSets } from './action';
import { reducer } from './reducer';

const profile = {
  action: { getSets, activateSet, deactivateSet, buySet },
  reducer,
};

export { profile };
