import { create, join, leave, whereIAm, teamJoin, teamLeave, teamCreate, teamDelete } from './action';
import { reducer } from './reducer';

const room = {
  action: {
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
