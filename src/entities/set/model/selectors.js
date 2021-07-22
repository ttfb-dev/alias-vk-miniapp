import { useSelector } from 'react-redux';

export const selectors = {
  useSets: () => {
    return useSelector((store) => store.sets.sets);
  },

  useAvailableSets: () => {
    return useSelector((store) => store.sets.availableSets);
  },
};
