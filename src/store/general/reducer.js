import { alert, route, setFriends, setUserId } from './action';

const isDev = process.env.NODE_ENV === 'development';

const initialState = {
  activeView: 'main',
  main: {
    activePanel: 'home',
  },
  game: {
    activePanel: 'room',
  },
  activeModal: '',
  friends: [],
  userId: null,
  isDebug: isDev,
  isRoomLeaveAlert: false,
  isGameEndAlert: false,
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case route.type:
      return { ...state, ...payload };

    case alert.type:
      return { ...state, ...payload };

    case setUserId.type:
      return { ...state, ...payload };

    case setFriends.type:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export { reducer };
