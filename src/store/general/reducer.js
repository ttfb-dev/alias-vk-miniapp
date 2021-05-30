import { route, setUserId, setFriends, setMembers } from './action';

const initialState = {
  activeView: 'home',
  activePanel: 'home',
  activeModal: null,
  friends: [],
  members: [],
  userId: null,
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case route.type:
      return {
        ...state,
        ...payload,
      };

    case setUserId.type:
      return {
        ...state,
        ...payload,
      };

    case setFriends.type:
      return {
        ...state,
        ...payload,
      };

    case setMembers.type:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export { reducer };
