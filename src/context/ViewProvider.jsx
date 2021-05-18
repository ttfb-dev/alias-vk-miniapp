import React, { useMemo, useState, useRef } from 'react';
import { ViewContext } from './ViewContext';

const ViewProvider = ({ children }) => {
  const [activePanel, setActivePanel] = useState('home');
  const [activeModal, setActiveModal] = useState(null);
  const [isPopout, setIsPopout] = useState(null);
  const popoutRootRef = useRef(null);

  const contextValue = useMemo(
    () => ({
      activePanel,
      activeModal,
      isPopout,
      setActivePanel,
      setActiveModal,
      setIsPopout,
      popoutRootRef,
    }),
    [
      activePanel,
      activeModal,
      isPopout,
      setActivePanel,
      setActiveModal,
      setIsPopout,
      popoutRootRef,
    ]
  );

  return (
    <ViewContext.Provider value={contextValue}>{children}</ViewContext.Provider>
  );
};

export { ViewProvider };
