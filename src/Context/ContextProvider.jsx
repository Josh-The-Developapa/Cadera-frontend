import Context from './Context.jsx';
import { useState, useEffect } from 'react';

function ContextProvider(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const setIsExpandedVal = (val) => {
    setIsExpanded(val);
  };

  return (
    <Context.Provider
      value={{
        isExpanded,
        setIsExpanded: setIsExpandedVal,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default ContextProvider;
