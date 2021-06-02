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
  gameStart,
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
    gameStart,
  },
  reducer,
};

export { room };
