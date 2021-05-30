import {
  setRoomId,
  setMembers,
  create,
  join,
  leave,
  whereIAm,
  teamJoin,
  teamLeave,
  teamCreate,
  teamDelete,
  activateSet,
  deactivateSet,
} from './action';
import { reducer } from './reducer';

const room = {
  action: {
    setRoomId,
    setMembers,
    create,
    join,
    leave,
    whereIAm,
    teamJoin,
    teamLeave,
    teamCreate,
    teamDelete,
    activateSet,
    deactivateSet,
  },
  reducer,
};

export { room };
