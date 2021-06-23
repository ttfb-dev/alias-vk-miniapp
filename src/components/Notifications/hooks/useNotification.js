import { useReducer } from 'react';

const initState = {
  notifications: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        notifications: [...state.notifications, action.notification],
      };

    case 'REMOVE':
      return {
        ...state,
        notifications: [...state.notifications.filter((notification) => notification.id !== action.id)],
      };

    case 'REMOVE_ALL':
      return {
        ...state,
        notifications: [],
      };

    default:
      return state;
  }
};

const useNotification = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  return { ...state, dispatch };
};

export { useNotification };
