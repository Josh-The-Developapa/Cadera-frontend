import { createContext } from 'react';

export const Context = createContext({
  // Changed to named export
  isExpanded: true,
  setIsExpanded: () => {},
});

// Keep default export if needed elsewhere
export default Context;
