import {
  activateSet,
  create,
  deactivateSet,
  gameEnd,
  gameStart,
  join,
  leave,
  setMembers,
  setRoomId,
  teamCreate,
  teamDelete,
  teamJoin,
  teamLeave,
  whereIAm,
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
    gameEnd,
  },
  reducer,
};

export { room };
