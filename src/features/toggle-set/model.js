import { setModel } from '@/entities/set';
import { store } from '@/store';

export const toggleSet = (set) => {
  if (set.status === 'active') {
    store.dispatch.sync(setModel.actions.deactivateSet({ datasetId: set.datasetId }));
  } else if (set.status === 'inactive') {
    store.dispatch.sync(setModel.actions.activateSet({ datasetId: set.datasetId }));
  }
};
