import { create, join, leave, whereIAm } from './action';
import { reducer } from './reducer';

const room = {
  action: {
    create,
    join,
    leave,
    whereIAm,
  },
  reducer,
};

export { room };
