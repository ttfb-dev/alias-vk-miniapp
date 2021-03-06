import {
  activateSet,
  create,
  deactivateSet,
  join,
  leave,
  setMembers,
  setRoomId,
  teamChange,
  teamCreate,
  teamDelete,
  teamJoin,
  teamLeave,
  updateSettings,
  whereIAm,
} from './action';
import { reducer } from './reducer';

const room = {
  action: {
    activateSet,
    create,
    deactivateSet,
    join,
    leave,
    setMembers,
    teamChange,
    setRoomId,
    teamCreate,
    teamDelete,
    teamJoin,
    teamLeave,
    whereIAm,
    updateSettings,
  },
  reducer,
};

export { room };
