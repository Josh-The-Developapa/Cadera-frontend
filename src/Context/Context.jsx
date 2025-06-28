import { createContext } from 'react';

export const Context = createContext({
  // Changed to named export
  isDrop: false,
  isLoggedIn: false,
  setIsDropVal: () => {},
  setIsLoggedIn: () => {},
});

// Keep default export if needed elsewhere
export default Context;
