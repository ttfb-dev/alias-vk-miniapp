import { roomSetModel } from '@/entities/room-set';
import { store } from '@/store';

export const toggleSet = (set) => {
  if (set.status === 'active') {
    store.dispatch.sync(roomSetModel.actions.deactivateSet({ datasetId: set.datasetId }));
  } else if (set.status === 'inactive') {
    store.dispatch.sync(roomSetModel.actions.activateSet({ datasetId: set.datasetId }));
  }
};
