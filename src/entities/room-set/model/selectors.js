import { useSelector } from 'react-redux';

export const selectors = {
  useSets: () => {
    return useSelector((store) => store.roomSets.sets);
  },

  useAvailableSets: () => {
    return useSelector((store) => store.roomSets.availableSets);
  },
};
