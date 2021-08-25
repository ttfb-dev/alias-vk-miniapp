import { activateSet, buySet, deactivateSet, getSets, isOnboardingFinished, setOnboardingFinished } from './action';
import { reducer } from './reducer';

const profile = {
  action: { getSets, activateSet, deactivateSet, buySet, isOnboardingFinished, setOnboardingFinished },
  reducer,
};

export { profile };
