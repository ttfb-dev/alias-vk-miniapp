import { route, setFriends, setMembers } from './action';

const params = new URLSearchParams(window.location.search);
const userId = parseInt(params.get('vk_user_id'), 10) ?? 0;

const initialState = {
  activeView: 'home',
  activePanel: 'home',
  activeModal: null,
  friends: [],
  members: [],
  userId,
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case route.type: {
      return {
        ...state,
        ...payload,
      };
    }

    case setFriends.type: {
      return {
        ...state,
        ...payload,
      };
    }
    case setMembers.type: {
      return {
        ...state,
        ...payload,
      };
    }

    default:
      return state;
  }
};

export { reducer };
