import Context from './Context.jsx';
import { useState, useEffect } from 'react';

function ContextProvider(props) {
  const [isDrop, setIsDrop] = useState(false);

  const setIsDropVal = (val) => {
    setIsDrop(val);
  };

  return (
    <Context.Provider
      value={{
        isDrop,
        setIsDropVal,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default ContextProvider;
