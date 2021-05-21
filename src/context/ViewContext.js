import { createContext } from 'react';

const ViewContext = createContext({
  activePanel: 'home',
  activeModal: null,
  isPopout: false,
  setActivePanel: () => {},
  setActiveModal: () => {},
  setIsPopout: () => {},
});

export { ViewContext };
