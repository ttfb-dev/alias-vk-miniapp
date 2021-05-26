import { route, setFriends } from './action';

const initialState = {
  activeView: 'home',
  activePanel: 'home',
  activeModal: null,
  friends: [],
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

    default:
      return state;
  }
};

export { reducer };
