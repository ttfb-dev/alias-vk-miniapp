import React, { useMemo, useState } from 'react';
import { ViewContext } from './ViewContext';

const ViewProvider = ({ children }) => {
  const [activeView, setActiveView] = useState('home');
  const [activePanel, setActivePanel] = useState('home');
  const [activeModal, setActiveModal] = useState(null);

  const contextValue = useMemo(
    () => ({
      activeView,
      activePanel,
      activeModal,
      setActiveView,
      setActivePanel,
      setActiveModal,
    }),
    [
      activeView,
      activePanel,
      activeModal,
      setActiveView,
      setActivePanel,
      setActiveModal,
    ]
  );

  return (
    <ViewContext.Provider value={contextValue}>{children}</ViewContext.Provider>
  );
};

export { ViewProvider };
