import { queryStringParse } from '../../helpers';

import { route } from './action';

const hashParams = queryStringParse(window.location.hash);

const initialState = {
  activeView: 'home',
  activePanel: 'home',
  activeModal: null,
  joinRoom: hashParams['join-room'] ?? '',
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
