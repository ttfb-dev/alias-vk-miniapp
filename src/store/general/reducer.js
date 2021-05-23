import { route } from './action';

const initialState = {
  activeView: 'home',
  activePanel: 'home',
  activeModal: null,
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

    default:
      return state;
  }
};

export { reducer };
