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
  },
  reducer,
};

export { room };
